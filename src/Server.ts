import express from 'express';
import { Request, Response, NextFunction } from 'express';
import BaseRouter from './routes';
import {NOT_FOUND} from 'http-status-codes';

const app: express.Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/', BaseRouter);

app.get('*', (req: Request, res: Response) => {
    res.status(NOT_FOUND).json({error: "Route not found"});
});

export default app;
