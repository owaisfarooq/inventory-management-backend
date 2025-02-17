import { PrismaClient } from '@prisma/client';
import { PrismaBaseModel } from '../utils/PrismaBaseModel';
import { BaseController } from './BaseController';

const prisma = new PrismaClient();

export class ProductController extends BaseController<PrismaBaseModel<any>> {
  constructor() {
    super(prisma.product);
  }

}
