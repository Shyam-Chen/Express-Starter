// @flow

import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

export const List = mongoose.model('List', listSchema);
