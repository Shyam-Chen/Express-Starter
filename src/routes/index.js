import { Router } from 'express';

import { User } from '../models';

const router = Router();

router.get('/', (req, res) => {
  res.render('index.html');
});

router.get('/api', (req, res) => {
  User.find({}, (err, users) => {
    if(err) throw err;
    res.end(JSON.stringify(users));
  });
});

export const route = router;
