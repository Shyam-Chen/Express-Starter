import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: { type: String, required: true },
  isCheck: { type: Boolean, default: false }
});

export const List = mongoose.model('List', listSchema);
