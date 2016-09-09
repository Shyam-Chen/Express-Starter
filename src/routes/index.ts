import * as express from 'express';

import { Index } from '../controllers';

const router = express.Router();

router.get('/', new Index().ctrl);

export const route = router;
