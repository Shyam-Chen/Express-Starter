import { Router } from 'express';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @example POST /upload/single
 */
router.post('/single', upload.single('photo'), (req, res) => {
  res.json({ file: req.file });
});

/**
 * @example POST /upload/multiple
 */
router.post('/multiple', upload.array('photos', 10), (req, res) => {
  res.json({ files: req.files });
});

export default router;
