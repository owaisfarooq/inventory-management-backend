import { PrismaBaseModel } from '../utils/PrismaBaseModel';
import { BaseController } from './BaseController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SupplierController extends BaseController<PrismaBaseModel<any>> {
  constructor() {
    super(prisma.supplier);
  }
}
