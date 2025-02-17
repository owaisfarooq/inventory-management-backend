import AppError from '../utils/AppError';
import { PrismaBaseModel } from '../utils/PrismaBaseModel';
import { NextFunction, Request, Response } from 'express';

export abstract class BaseController<T extends PrismaBaseModel<T>> {

  constructor(protected readonly model: T) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;

      if (!data) {
        res.status(400).json({ message: 'body cannot be empty' });
        return;
      }

      const createdItem = await this.model.create({ data });
      res.status(201).json(createdItem);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query['page'] as string) || 1;
      const limit = parseInt(req.query['limit'] as string) || 10;
      const skip = (page - 1) * limit;

      const items = await this.model.findMany({
        skip,
        take: limit
      });

      const totalItems = await this.model.count();
      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).json({
        data: items,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          pageSize: limit
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params['id']) {
        res.status(400).json({ message: 'id is required' });
        return;
      }
      const id: number = parseInt(req.params['id']);

      const item = await this.model.findUnique({
        where: { id }
      });

      if (!item) {
        res.status(404).json({ message: 'Item not found' });
        return;
      }

      res.status(200).json(item);
      return;
    } catch (error) {
      next(error);
    }
  }

  // Update by ID
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params['id']) {
        res.status(400).json({ message: 'id is required' });
        return;
      }
      const id = String(req.params['id']);
      const data = req.body;

      const existingItem = await this.model.findFirst({
        where: { id }
      });

      if (!existingItem) {
        throw new AppError('Invalid Id, No item found with the provided Id.', 400, false);
      }

      const updatedItem = await this.model.update({
        where: { id },
        data
      });

      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  // Delete by ID
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params['id']) {
        res.status(400).json({ message: 'id is required' });
        return;
      }
      const id = parseInt(req.params['id']);

      const deletedItem = await this.model.delete({
        where: { id }
      });

      res.status(200).json(deletedItem);
    } catch (error) {
      next(error);
    }
  }
}
