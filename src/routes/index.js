import { Router } from 'express';

import { User } from '../models';

const router = Router();

router.get('/', (req, res) => {
  res.send('Backend Starter Kit');
});

router.get('/api', (req, res) => {
  User.find({}, (err, users) => {
    if(err) throw err;
    console.log(users);
    res.end(JSON.stringify(users));
  });
});

export const route = router;
