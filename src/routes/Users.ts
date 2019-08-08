import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, NOT_MODIFIED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { User, UserValidator } from '@entities';
import { UserStore } from '@data';

const router: Router = Router();

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        UserValidator(user);
        if (UserStore.doesUserExist(user)) {
            return res.status(NOT_MODIFIED).end();
        } else {
            const newUser: User = UserStore.add(user);
            return res.status(CREATED).json({
                created: {
                    ...newUser,
                }
            });
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            console.error(err.annotate());
            return res.status(BAD_REQUEST).json({
                error: err.details,
            });
        } else {
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });

        }
    }
});

export default router;
