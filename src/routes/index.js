import express from 'express';

import listRoutes from './list'

const router  = express.Router();

router.use('/__/list', listRoutes);

export default router;
