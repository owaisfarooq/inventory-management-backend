import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrderController extends BaseController<any> {
  constructor() {
    super(prisma.order);
  }
}
