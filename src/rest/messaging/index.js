import express from 'express';

import email from './email';
import sms from './sms';

const router = express.Router();

router.use('/email', email);
router.use('/sms', sms);

export default router;
