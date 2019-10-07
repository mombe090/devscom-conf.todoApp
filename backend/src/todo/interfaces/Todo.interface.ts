import {Document} from 'mongoose';

export interface TodoInterface extends Document{
    readonly _id: string;
    readonly title: string;
    readonly desc: string;
    readonly done: boolean;
}
