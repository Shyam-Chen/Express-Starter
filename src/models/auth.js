import mongoose, { Schema } from 'mongoose';

/**
 * @name user
 */
const userSchema = Schema({
  name: String,
  password: String
});

export const User = mongoose.model('User', userSchema);

/**
 * @name google
 */
// TODO: ...
