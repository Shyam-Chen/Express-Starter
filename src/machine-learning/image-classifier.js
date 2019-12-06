import { Router } from 'express';

import ObjectDetectors from './object-detectors';

const router = Router();

router.post('/detect-image-objects', async (req, res) => {
  const { data, type } = req.body.data;
  const objectDetect = new ObjectDetectors(data, type);
  const results = await objectDetect.process();
  res.json(results);
});

export default router;
