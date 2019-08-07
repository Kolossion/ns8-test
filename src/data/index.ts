export interface IUser {
  uuid : number,

}


interface IStore {
  users: [IUser],
  events: [Event],
}

const store = {
  users: [],
  events: []
}

export class FakeDB