import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * @name user
 */
const userSchema = Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.comparePassword = password =>
  bcrypt.compareSync(password, this.password);

export const User = mongoose.model('User', userSchema);

/**
 * @name google
 */
// TODO
const googleUserSchema = Schema({

});

export const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

/**
 * @name facebook
 */
// TODO
const facebookUserSchema = Schema({

});

export const FacebookUser = mongoose.model('FacebookUser', facebookUserSchema);

/**
 * @name twitter
 */
// TODO
const twitterUserSchema = Schema({

});

export const TwitterUser = mongoose.model('TwitterUser', twitterUserSchema);
