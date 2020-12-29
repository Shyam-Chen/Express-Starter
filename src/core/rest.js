import { Router } from 'express';

import { INDEX_NAME } from '~/env';
import helloWorld from '~/hello-world';
import crudOperations from '~/crud-operations/rest';
import authentication from '~/authentication/rest';

const router = Router();

router.get('/', (req, res) => {
  res.send(`app-root, ${INDEX_NAME} mode`);
});

router.use(helloWorld.prefix, helloWorld);
router.use('/crud-operations', crudOperations);
router.use('/authentication', authentication);

export default router;
