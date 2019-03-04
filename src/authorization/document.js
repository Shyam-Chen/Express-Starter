import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  permission: [
    {
      modules: [String],
      operations: [String],
    },
  ],
});

userSchema.methods = {
  generateHash(password) {
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  validPassword(password) {
    bcrypt.compareSync(password, userSchema.password);
  },
};

export const User = mongoose.model('User', userSchema);
