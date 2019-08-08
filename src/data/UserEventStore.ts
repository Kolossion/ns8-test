// import {User, IUser} from '@entities';
import {UserEvent, IUserEvent} from '@entities';
import {filter} from 'lodash';
import moment from 'moment';

const userEventStoreData: [UserEvent?] = [];

export interface IUserEventStore {
  print: () => void;
  add: (event: IUserEvent) => UserEvent;
  getByUser: (userId: number) => Array<(UserEvent | undefined)>;
  getInLastDay: () => Array<(UserEvent | undefined)>;
}

export const UserEventStore: IUserEventStore = {
  print(): void {
    console.log(userEventStoreData);
  },

  add(event: IUserEvent): UserEvent {
    // userEventStoreData.push(new UserEvent(event.type, event.userId));
    const newEvent = new UserEvent(event.type, event.userId);
    userEventStoreData.push(newEvent);
    return newEvent;
  },

  getByUser(userId: number): Array<(UserEvent | undefined)> {
    return userEventStoreData.filter( (e) => {
      if (e && e.userId) {return e.userId == userId; } else {return false; }
    } );
  },

  getInLastDay(): Array<(UserEvent | undefined)> {
    const now = moment();
    const yesterday = moment().subtract(24, 'hours');
    return userEventStoreData.filter( (e) => {
      if (e && e.date) {
        return moment(e.date).isBetween(now, yesterday);
      }
      return false;
    })
  },
}