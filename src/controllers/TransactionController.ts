import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionController extends BaseController<any> {
  constructor() {
    super(prisma.transaction);
  }
}
