import { Router } from 'express';

import helloWorld from '~/hello-world/rest';
import crudOperations from '~/crud-operations/rest';
import authorization from '~/authorization/rest';

const router = Router();

router.get('/', (req, res) => {
  res.send('app-root');
});

router.use('/hello-world', helloWorld);
router.use('/crud-operations', crudOperations);
router.use('/authorization', authorization);

export default router;
