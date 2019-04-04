import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: String,
  permissions: [
    {
      route: String,
      operations: [String],
    },
  ],
});

export const User = mongoose.model('User', userSchema);
