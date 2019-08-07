import { Router } from 'express';
import UsersRouter from './Users';

const router = Router();

router.use('/users', UsersRouter);

export default router;
