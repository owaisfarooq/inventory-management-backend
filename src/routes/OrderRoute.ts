import { BaseRoute } from './BaseRoute';
import { OrderController } from '../controllers/OrderController';

export class OrderRoute extends BaseRoute<any> {
  constructor() {
    super(new OrderController());
  }
}
