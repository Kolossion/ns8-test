import { Router } from 'express';
import UsersRouter from './Users';
import UserEventsRouter from './UserEvents';

const router = Router();

router.use('/users', UsersRouter);
router.use('/events', UserEventsRouter);

export default router;
