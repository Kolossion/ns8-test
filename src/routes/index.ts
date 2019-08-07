import { Router } from 'express';
import UsersRouter from './Users';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UsersRouter);

// Export the base-router
export default router;
