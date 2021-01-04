import { Router } from 'express';

import multer from '~/core/multer';

const router = Router();

/**
 * @example POST /upload/single
 */
router.post('/single', multer.single('photo'), (req, res) => {
  res.json({ file: req.file });
});

/**
 * @example POST /upload/multiple
 */
router.post('/multiple', multer.array('photos', 10), (req, res) => {
  res.json({ files: req.files });
});

export default router;
