import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Method } from './Method';
import { MetadataKey } from './MetadataKey';
import { NextFunction, Request, RequestHandler, Response } from 'express';

function bodyValidators(fields: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (const field of fields) {
      if (!req.body[field]) {
        res.status(422).send(`Missing property ${field}`);
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.instance;
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKey.path, target.prototype, key);
      const method: Method = Reflect.getMetadata(
        MetadataKey.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKey.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKey.validator, target.prototype, key) || [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    });
  };
}
