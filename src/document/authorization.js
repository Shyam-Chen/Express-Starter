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

userSchema.methods.generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

userSchema.methods.validPassword = password =>
  bcrypt.compareSync(password, userSchema.jwt.password);

export const User = mongoose.model('User', userSchema);
