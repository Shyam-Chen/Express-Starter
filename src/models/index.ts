const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String
});

export const User = mongoose.model('User', userSchema);
