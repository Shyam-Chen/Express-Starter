import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = Schema({
  jwt: {},
  facebook: {},
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  twitter: {},
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

export const User = mongoose.model('User', userSchema);
