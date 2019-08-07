import Joi, { AnySchema, ValidationResult } from 'joi';
let curId: number = 0;

const userSchema: AnySchema = Joi.object().keys({
    email: Joi.string().email({minDomainAtoms: 2}).required(),
    password: Joi.string().required(),
    id: Joi.number(),
    phone: Joi.string().regex(/[0-9]{3}-[0-9]{3}-[0-9]{4}/i),
}).with('email', 'password')

export interface IUser {
    id?: number;
    email: string;
    password: string;
    phone?: string;
}

// NOTE: Fix the typing on this function return
export function UserValidator(user: IUser): void {
    Joi.assert(user, userSchema);
}

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
