import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SupplierController extends BaseController<any> {
  constructor() {
    super(prisma.supplier);
  }
}
