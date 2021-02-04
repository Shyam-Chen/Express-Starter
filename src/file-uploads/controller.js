import { Router } from 'express';

import multer from '~/core/multer';

const controller = (() => {
  const router = Router();

  /**
   * @example POST /file-uploads/single
   *
   * const formData = new FormData();
   * formData.append('photo', <FILE>)
   */
  router.post('/single', multer.single('photo'), (req, res) => {
    res.json({ file: req.file });
  });

  /**
   * @example POST /file-uploads/multiple
   */
  router.post('/multiple', multer.array('photos', 10), (req, res) => {
    res.json({ files: req.files });
  });

  return router;
})();

controller.prefix = '/file-uploads';

export default controller;
