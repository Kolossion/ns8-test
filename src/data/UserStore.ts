import {User, IUser} from '@entities';
import {find} from 'lodash';

export interface IUserStore {
  users: [User?];
  addUser: (user: IUser) => void;
  doesUserExist: (user: IUser) => boolean;
}

export class UserStore implements IUserStore {
  public users : [User?];

  constructor() {
    this.users = []
  }

  public addUser(user: IUser) {
    this.users.push(new User(user.email, user.password, user.phone));
  }

  public doesUserExist(user: IUser) {
    let match = find(this.users, (u: User) => u.email === user.email);
    return !!match;
  }
}