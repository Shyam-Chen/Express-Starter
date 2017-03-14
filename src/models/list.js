import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: String
});

export const List = mongoose.model('List', listSchema);
