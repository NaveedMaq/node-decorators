import { NextFunction, Request, Response, Router } from 'express';

interface RequestWithBody extends Request {
  body: { [k: string]: string | undefined };
}

const router = Router();

function protect(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  } else {
    res.status(403);
    res.send('Not permitted');
  }
}

router.get('/login', (req: RequestWithBody, res: Response) => {
  res.send(`
    <form method='POST'>
      <div>
        <label>Email</label>
        <input name='email'/>
      </div>

      <div>
        <label>Password</label>
        <input name='password' type='password'/>
      </div>

      <button>Submit</button>
    </form>
  `);
});

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', protect, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user');
});

export default router;
