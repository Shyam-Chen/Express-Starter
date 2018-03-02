import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: {
    type: String,
    required: true,
  },
});

export const List = mongoose.model('List', listSchema);
