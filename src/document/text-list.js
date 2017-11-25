import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: String,
  isCheck: { type: Boolean, default: false }
});

export const List = mongoose.model('List', listSchema);
