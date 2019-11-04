import mongoose from 'mongoose';

import { MONGODB_URI } from '~/env';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

export default mongoose;
