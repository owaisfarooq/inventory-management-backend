import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import AppError from '../utils/AppError';
import { PrismaBaseModel } from '../utils/PrismaBaseModel';

const prisma = new PrismaClient();

export class UserController extends BaseController<PrismaBaseModel<any>> {
  constructor() {
    super(prisma.user);
    this.create = this.create.bind(this);
  }

  override async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      if (!data) {
        return next(new AppError('Request Body needs to have User Object.', 400));
      }

      if (!data['email']) {
        return next(new AppError('email is a requred firld', 400));
      }

      if (!data['name']) {
        return next(new AppError('name is a requred firld', 400));
      }

      if (!data['password']) {
        return next(new AppError('password is a requred firld', 400));
      }

      const saltRounds: number = 10;
      data['password'] = await bcrypt.hash(data.password, saltRounds);
      const createdItem = await this.model.create({ data });
      delete createdItem['password'];
      res.status(201).json(createdItem);
    } catch (error) {
      next(error);
    }
  }

}
