// @flow

import mongoose from 'mongoose';

import { MONGODB_URI } from '~/env';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

export default mongoose;
