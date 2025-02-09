import { BaseRoute } from './BaseRoute';
import { UserController } from '../controllers/UserController';

export class UserRoute extends BaseRoute<any> {
  constructor() {
    super(new UserController());
  }
}
