import { BaseRoute } from './BaseRoute';
import { ProductController } from '../controllers/ProductController';

export class ProductRoute extends BaseRoute<any> {
  constructor() {
    super(new ProductController());
  }
}
