
import v4 from 'uuid';

export interface IUser {
    id?: number;
    email: string;
    password: string;
    phone?: string;
}

let curId: number = 0;

export class User implements IUser {
    public id?: number;
    public email: string;
    public password: string;
    public phone?: string;

    constructor(email: string, password: string, phone?: string) {
        this.id = ++curId;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
}
