import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
// import BaseRouter from './routes';
// import {UsersRouter, EventsRouter} from './routes';
import BaseRouter from './routes';
// import UsersRouter from './routes';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/api', BaseRouter);
app.use('/', BaseRouter);
// app.use('/events', EventsRouter);

app.get('*', (req: Request, res: Response) => {
    res.json({hello: 'world'});
})

// Export express instance
export default app;
