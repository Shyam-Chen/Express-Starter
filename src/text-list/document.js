// @flow

import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

const methods = {
  print(): void {
    console.log(`Text: ${this.text}`);
  },
};

listSchema.methods = methods;

export const List = mongoose.model('List', listSchema);
