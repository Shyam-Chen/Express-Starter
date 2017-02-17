import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  user_name: { type : String, required : true, unique : true },
  password: { type : String, required : true },
  image: String,
  created_at: { type : Date, default : Date.now },
  updated_at: { type : Date, default : Date.now }
});

export const User = mongoose.model('user', userSchema);
