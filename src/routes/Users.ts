// import { UserDao } from '@daos';
// import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { FakeDB } from 'src/data';

// Init shared
const router = Router();
// const userDao = new UserDao();

router.post('/add', async (req: Request, res: Response) => {
    console.log('ADDING USER', req.body);
    try {
        const { user } = req.body;
        // create user
        return res.status(CREATED).end();
    } catch (err) {
        console.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
    // try {
    //     const { user } = req.body;
    //     if (!user) {
    //         return res.status(BAD_REQUEST).json({
    //             error: paramMissingError,
    //         });
    //     }
    //     // req.fakeDB.addUser(user)
    //     return res.status(CREATED).end();
    // } catch (err) {
    //     console.error(err.message, err);
    //     return res.status(INTERNAL_SERVER_ERROR).json({
    //         error: err.message,
    //     });
    // }
});

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

// router.get('/all', async (req: Request, res: Response) => {
//     try {
//         const users = await userDao.getAll();
//         return res.status(OK).json({users});
//     } catch (err) {
//         logger.error(err.message, err);
//         return res.status(BAD_REQUEST).json({
//             error: err.message,
//         });
//     }
// });

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
