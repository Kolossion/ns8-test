import {User, IUser} from '@entities';

export interface IUserStore {
  users: [User?];
  addUser: (user: IUser) => void;
}

export class UserStore implements IUserStore {
  public users : [User?];
  // public events : [UserEvent?];

  constructor() {
    this.users = []
    // this.events = []
  }

  public addUser(user: IUser) {
    this.users.push(new User(user.email, user.password, user.phone))
  }
}