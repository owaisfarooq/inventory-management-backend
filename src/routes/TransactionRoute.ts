import { BaseRoute } from './BaseRoute';
import { TransactionController } from '../controllers/TransactionController';

export class TransactionRoute extends BaseRoute<any> {
  constructor() {
    super(new TransactionController());
  }
}
