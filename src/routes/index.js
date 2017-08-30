import express from 'express';

import listRoutes from './list';
import authRoutes from './auth';

const router  = express.Router();

router.use('/__/list', listRoutes);
router.use('/__/auth', authRoutes);

export default router;
