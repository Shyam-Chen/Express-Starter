import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  jwt: {},
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  facebook: {},
  twitter: {},
});

const methods = {
  generateHash(password) {
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  validPassword(password) {
    bcrypt.compareSync(password, userSchema.jwt.password);
  },
};

userSchema.methods = methods;

export const User = mongoose.model('User', userSchema);
