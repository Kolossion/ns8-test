
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, NOT_MODIFIED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { UserEvent, UserEventValidator } from '@entities';
import { UserEventStore, UserStore } from '@data';

const router: Router = Router();

router.post('/add', async (req: Request, res: Response) => {
    try {
        const { event } = req.body;
        UserEventValidator(event);
        if (UserStore.doesIdExist(event.userId)) {
          const newEvent: UserEvent = UserEventStore.add(event);
          return res.status(CREATED).json({
              created: {
                  ...newEvent,
              }
          });
        } else {
          return res.status(NOT_MODIFIED).json({
            message: `User with ID ${event.userId} doesn't exist`,
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

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      return res.status(OK).json({
        events: UserEventStore.getByUser(req.params.id)
      });
    } else {
      return res.status(BAD_REQUEST).json({
        error: 'Missing User ID parameter',
      });
    }
  } catch (err) {
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
  }
});

router.get('/today', async (req: Request, res: Response) => {
  try {
    const events = UserEventStore.getInLastDay();
    return res.status(OK).json({
      events,
    });
  } catch (err) {
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
  }
});

export default router;
