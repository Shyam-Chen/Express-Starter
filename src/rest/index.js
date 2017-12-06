import express from 'express';

import messaging from './messaging';

import textList from './text-list';
import authorization from './authorization';
import fileUpload from './file-upload';

const router = express.Router();

router.use('/messaging', messaging);

router.use('/list', textList);
router.use('/authorization', authorization);
router.use('/file-upload', fileUpload);

export default router;
