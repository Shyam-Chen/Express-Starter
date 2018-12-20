import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.methods = {
  generateHash(password) {
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  validPassword(password) {
    bcrypt.compareSync(password, userSchema.jwt.password);
  },
};

export const User = mongoose.model('User', userSchema);
