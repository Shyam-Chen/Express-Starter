import mongoose, { Schema } from 'mongoose';

/**
 * @example
 * {
 *   username: 'shyam-chen',
 *   password: '3345678',
 *   email: 'shyam.chen@gmail.com',
 *   role: 'user',
 *   permissions: [
 *     {
 *       route: '/blog',
 *       operations: ['create', 'read', 'update', 'delete']
 *     }
 *   ]
 * }
 */
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
    validate: {
      validator(value) {
        return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(value);
      },
      message: ({ value }) => `${value} is not a valid email format`,
    },
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
