import { join } from 'path';
import { Router } from 'express';
import formidable from 'formidable';

const router = Router();

router.post('/', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req)
    .on('fileBegin', (name, file) => {
      file.path = join(__dirname, 'uploads', file.name);
    })
    .on('file', (name, file) => {
      res.json({ message: `${file.name} Uploaded` });
    });
});

export default router;
