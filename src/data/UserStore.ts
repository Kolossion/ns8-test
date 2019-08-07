import {User, IUser} from '@entities';
import {find} from 'lodash';

const userStoreData: [User?] = []

export interface IUserStore {
  print: () => void;
  add: (user: IUser) => void;
  doesUserExist: (user: IUser) => boolean;
  doesIdExist: (id: number) => boolean;
}

export const UserStore = {
  print() {
    console.log(userStoreData);
  },

  add(user: IUser) {
    userStoreData.push(new User(user.email, user.password, user.phone));
  },

  doesUserExist(user: IUser): boolean {
    const match = find(userStoreData, (u: User) => u.email === user.email);
    return !!match;
  },

  doesIdExist(id: number): boolean {
    const match = find(userStoreData, (u: User) => u.id === id );
    return !!match;
  },
};