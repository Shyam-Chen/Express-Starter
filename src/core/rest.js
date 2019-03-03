import { Router } from 'express';

import helloWorld from '~/hello-world/rest';
import textList from '~/text-list/rest';
import authorization from '~/authorization/rest';

const router = Router();

router.use('/hello-world', helloWorld);
router.use('/text-list', textList);
router.use('/authorization', authorization);

export default router;
