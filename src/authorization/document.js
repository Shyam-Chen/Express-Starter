import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    dropDups: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', userSchema);
