import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    done: Boolean
});

