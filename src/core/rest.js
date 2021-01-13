import { Router } from 'express';

import { INDEX_NAME } from '~/env';
import helloWorld from '~/hello-world';
import crudOperations from '~/crud-operations';
import authentication from '~/authentication/rest';
// import fileUploads from '~/file-uploads';
// import realtimeData from '~/realtime-data';

const router = Router();

router.get('/', (req, res) => {
  res.send(`app-root, ${INDEX_NAME} mode`);
});

router.use(helloWorld.prefix, helloWorld);
router.use(crudOperations.prefix, crudOperations);
router.use('/authentication', authentication);
// router.use(fileUploads.prefix, fileUploads);
// router.use(realtimeData.prefix, realtimeData);

export default router;
