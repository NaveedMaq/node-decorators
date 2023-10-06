import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';
import homeRoutes from './routes/home';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['key'] }));

app.use('/', homeRoutes);
app.use('/', authRoutes);

app.listen(3000, () => console.log('Listening on port 3000'));
