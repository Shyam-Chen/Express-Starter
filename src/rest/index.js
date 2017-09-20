import express from 'express';

import listRoutes from './list';
import authRoutes from './auth';
import formControlsRoutes from './form-controls';

const router  = express.Router();

router.use('/__/list', listRoutes);
router.use('/__/auth', authRoutes);
router.use('/__/form-controls', formControlsRoutes);

export default router;
