import express from 'express';

export class AppRouter {
  private static router: express.Router;

  private constructor() {}

  static get instance(): express.Router {
    if (!AppRouter.router) {
      AppRouter.router = express.Router();
    }

    return AppRouter.router;
  }
}
