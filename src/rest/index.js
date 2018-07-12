import express from 'express';

import helloWorld from './hello-world';
import textList from './text-list';
import inMemory from './in-memory';

const router = express.Router();

router.use('/hello-world', helloWorld);
router.use('/text-list', textList);
router.use('/in-memory', inMemory);

export default router;
