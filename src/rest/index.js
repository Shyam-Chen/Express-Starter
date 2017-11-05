import express from 'express';

import listRoutes from './list';
import authorizationRoutes from './authorization';

const router = express.Router();

router.use('/list', listRoutes);
router.use('/authorization', authorizationRoutes);

export default router;
