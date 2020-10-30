import { Router } from 'express';

import helloWorld from '~/hello-world/rest';
import crudOperations from '~/crud-operations/rest';
import authentication from '~/authentication/rest';

const router = Router();

router.get('/', (req, res) => {
  res.send(`app-root, ${process.env.INDEX_NAME}`);
});

router.use('/hello-world', helloWorld);
router.use('/crud-operations', crudOperations);
router.use('/authentication', authentication);

export default router;
