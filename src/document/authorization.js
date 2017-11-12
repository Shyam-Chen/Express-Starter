import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  }
});

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
