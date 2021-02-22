import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

export const ListColl = mongoose.model('List', listSchema);
