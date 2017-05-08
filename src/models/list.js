import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: String,
  created: Date
});

export const List = mongoose.model('List', listSchema);
