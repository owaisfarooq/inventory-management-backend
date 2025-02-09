import { ApiTags } from '@nestjs/swagger';
import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';
import { Controller } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

@ApiTags('Product')
@Controller('product')
export class ProductController extends BaseController<any> {
  constructor() {
    super(prisma.product);
  }

  /**
   * @swagger
   * /products/{id}:
   *   get:
   *     summary: Retrieve a product by its ID
   *     tags: [Product]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the product to retrieve
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Successfully retrieved the product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
   *                 price:
   *                   type: number
   *                   format: float
   *                 description:
   *                   type: string
   *       404:
   *         description: Product not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       500:
   *         description: Internal server error
  */
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

}
