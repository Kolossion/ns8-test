import { AnySchema } from 'joi';
// NOTE: This is required after an update to this library.
// ES6/2017 imports didn't behave properly.
const Joi = require('@hapi/joi');
import v4 from 'uuid';
import moment from 'moment';
// let curId: number = 0;

const userEventSchema: AnySchema = Joi.object().keys({
    type: Joi.string().required(),
    userId: Joi.number().required(),
});

export interface IUserEvent {
    id?: string;
    type: string;
    userId: number;
    date?: number;
}

// NOTE: Fix the typing on this function return
export function UserEventValidator(event: IUserEvent): void {
    Joi.assert(event, userEventSchema);
}

export class UserEvent implements IUserEvent {
    public id?: string;
    public type: string;
    public userId: number;
    public date: number;

    constructor(type: string, userId: number) {
        this.id = v4();
        this.date = moment.now();
        this.type = type;
        this.userId = userId;
    }
}