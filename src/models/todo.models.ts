import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        unique: true,
    },
    completed: { 
        type: Boolean,
        required: true,
    },
});

export interface Todo {
    id?: string;
    title?: string;
    completed?: boolean;
};

