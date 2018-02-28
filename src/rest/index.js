import express from 'express';

import textList from './text-list';
import autocomplete from './autocomplete';

const router = express.Router();

router.use('/list', textList);
router.use('/text-list', textList);
router.use('/autocomplete', autocomplete);

export default router;
