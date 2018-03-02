import express from 'express';

import textList from './text-list';
import realTime from './real-time';
import inMemory from './in-memory';

const router = express.Router();

router.use('/text-list', textList);
router.use('/real-time', realTime);
router.use('/in-memory', inMemory);

export default router;
