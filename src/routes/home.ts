import { Request, Response, Router } from 'express';

interface RequestWithBody extends Request {
  body: { [k: string]: string | undefined };
}

const router = Router();

router.get('/', (req: RequestWithBody, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
    <div>
      <div>You are logged in</div>
      <a href='/logout'>Logout</a>
    </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are not logged in</div>
      <a href='/login'>Login</a>
    </div>
    `);
  }
});

export default router;
