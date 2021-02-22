import crypto from 'crypto';

import model from './model';

export default {
  generateRefreshToken(user, ipAddress) {
    return new model.RefreshToken({
      user: user.id,
      token: crypto.randomBytes(40).toString('hex'),
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      ipAddress,
    });
  },
};
