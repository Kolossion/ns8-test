import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, NOT_MODIFIED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { UserStore } from '@data';
import { User } from '@entities';

const userStore: UserStore = new UserStore();
const router: Router = Router();

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        //validate obj
        if (userStore.doesUserExist(user)) {
            return res.status(NOT_MODIFIED).end();
        } else {
            userStore.addUser(user)
            console.log('USERS', userStore);
            return res.status(CREATED).end();
        }
    } catch (err) {
        console.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

// /******************************************************************************
//  *                       Add One - "POST /api/users/add"
//  ******************************************************************************/

// router.post('/add', async (req: Request, res: Response) => {
//     try {
//         const { user } = req.body;
//         if (!user) {
//             return res.status(BAD_REQUEST).json({
//                 error: paramMissingError,
//             });
//         }
//         await userDao.add(user);
//         return res.status(CREATED).end();
//     } catch (err) {
//         logger.error(err.message, err);
//         return res.status(BAD_REQUEST).json({
//             error: err.message,
//         });
//     }
// });

// /******************************************************************************
//  *                       Update - "PUT /api/users/update"
//  ******************************************************************************/

// router.put('/update', async (req: Request, res: Response) => {
//     try {
//         const { user } = req.body;
//         if (!user) {
//             return res.status(BAD_REQUEST).json({
//                 error: paramMissingError,
//             });
//         }
//         user.id = Number(user.id);
//         await userDao.update(user);
//         return res.status(OK).end();
//     } catch (err) {
//         logger.error(err.message, err);
//         return res.status(BAD_REQUEST).json({
//             error: err.message,
//         });
//     }
// });

// /******************************************************************************
//  *                    Delete - "DELETE /api/users/delete/:id"
//  ******************************************************************************/

// router.delete('/delete/:id', async (req: Request, res: Response) => {
//     try {
//         await userDao.delete(Number(req.params.id));
//         return res.status(OK).end();
//     } catch (err) {
//         logger.error(err.message, err);
//         return res.status(BAD_REQUEST).json({
//             error: err.message,
//         });
//     }
// });

// /******************************************************************************
//  *                                     Export
//  ******************************************************************************/

export default router;
