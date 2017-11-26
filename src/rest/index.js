import express from 'express';

import textListRoutes from './text-list';
import authorizationRoutes from './authorization';
import emailRoutes from './email';
import fileUploadRoutes from './file-upload';

const router = express.Router();

router.use('/list', textListRoutes);
router.use('/authorization', authorizationRoutes);
router.use('/email', emailRoutes);
router.use('/file-upload', fileUploadRoutes);

export default router;
