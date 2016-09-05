import * as express from 'express';

const router = express.Router();

router.get('/', (req: any, res: any) => {
  res.render('index', {
    title: 'Express5TS Quick Start'
  });
});

export = router;
