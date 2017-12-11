import express from 'express';

import textList from './text-list';

const router = express.Router();

router.use('/list', textList);

export default router;
