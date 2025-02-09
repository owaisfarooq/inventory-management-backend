import { BaseRoute } from './BaseRoute';
import { SupplierController } from '../controllers/SupplierController';

export class SupplierRoute extends BaseRoute<any> {
  constructor() {
    super(new SupplierController());
  }
}
