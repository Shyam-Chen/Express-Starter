import express from 'express';

import textListRoutes from './text-list';
import authorizationRoutes from './authorization';

const router = express.Router();

router.use('/list', textListRoutes);
router.use('/authorization', authorizationRoutes);

export default router;
