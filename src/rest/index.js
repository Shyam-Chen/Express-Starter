import express from 'express';

import textListRoutes from './text-list';
import authorizationRoutes from './authorization';
import emailRoutes from './email';

const router = express.Router();

router.use('/list', textListRoutes);
router.use('/authorization', authorizationRoutes);
router.use('/email', emailRoutes);

export default router;
