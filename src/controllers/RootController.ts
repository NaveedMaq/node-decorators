import { NextFunction, Request, Response } from 'express';
import { controller, get, use } from './decorators';

function protect(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  } else {
    res.status(403);
    res.send('Not permitted');
  }
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session?.loggedIn) {
      res.send(`
      <div>
        <div>You are logged in</div>
        <a href='/auth/logout'>Logout</a>
      </div>
      `);
    } else {
      res.send(`
      <div>
        <div>You are not logged in</div>
        <a href='/auth/login'>Login</a>
      </div>
      `);
    }
  }

  @get('/protected')
  @use(protect)
  getProtected(req: Request, res: Response): void {
    res.send('Welcome to protected route, logged in user');
  }
}
