import express from 'express';

import paypal from './paypal';
const router = express.Router();

router.use('/paypal', paypal);

export default router;
