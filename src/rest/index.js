import express from 'express';

import listRoutes from './list';
import authorizationRoutes from './authorization';
import formControlsRoutes from './form-controls';

const router  = express.Router();

router.use('/__/list', listRoutes);
router.use('/__/authorization', authorizationRoutes);
router.use('/__/form-controls', formControlsRoutes);

export default router;
