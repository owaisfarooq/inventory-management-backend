import express, { Router } from 'express';
import { BaseController } from '../controllers/BaseController'; // import BaseController

export abstract class BaseRoute<T> {
  router: Router;
  controller: BaseController<T>;

  constructor(controller: BaseController<T>) {
    this.router = express.Router();
    this.controller = controller;
    this.initializeRoutes(); // Initialize routes when the object is created
  }

  getRouter(): Router {
    return this.router;
  }

  getController(): BaseController<T> {
    return this.controller;
  }

  // Abstract method to be implemented by child classes
  initializeRoutes(): void {
    this.router.post('/', this.controller.create);
    this.router.get('/', this.controller.getAll);
    this.router.get('/:id', this.controller.getById);
    this.router.put('/:id', this.controller.update);
    this.router.delete('/:id', this.controller.delete);
  };
}
