import { ApiTags } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export class BaseController<T> {
    model: any;
    modelName: string;

    constructor(model: any) {
        this.modelName = model.name;
        this.model = model;
        this.getAll = this.getAll.bind(this);
    }

    protected static setSwaggerTags(controllerName: string) {
        return ApiTags(controllerName);
    }

    // Create
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const createdItem = await this.model.create({ data });
            res.status(201).json(createdItem);
        } catch (error) {
           next(error);
        }
    }

    /**
     * @swagger
     * /api/{modelName}:
     *   get:
     *     summary: Get all items with pagination
     *     description: Retrieve a list of items with pagination support
     *     tags: [BaseController]
     *     parameters:
     *       - in: path
     *         name: modelName
     *         required: true
     *         schema:
     *           type: string
     *         description: The name of the model (e.g., 'users', 'products')
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           default: 1
     *         description: The page number
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 10
     *         description: The number of items per page
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                 pagination:
     *                   type: object
     *                   properties:
     *                     currentPage:
     *                       type: integer
     *                     totalPages:
     *                       type: integer
     *                     totalItems:
     *                       type: integer
     *                     pageSize:
     *                       type: integer
     *       500:
     *         description: Server error
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;

            const items = await this.model.findMany({
                skip,
                take: limit,
            });

            const totalItems = await this.model.count();
            const totalPages = Math.ceil(totalItems / limit);

            res.status(200).json({
                data: items,
                pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                pageSize: limit,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    // Get by ID
    async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const item = await this.model.findUnique({
                where: { id },
            });

            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            return res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    }

    // Update by ID
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const data = req.body;

            const updatedItem = await this.model.update({
                where: { id },
                data,
            });

            res.status(200).json(updatedItem);
        } catch (error) {
            next(error);
        }
    }

    // Delete by ID
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);

            const deletedItem = await this.model.delete({
                where: { id },
            });

            res.status(200).json(deletedItem);
        } catch (error) {
            next(error);
        }
    }
}
