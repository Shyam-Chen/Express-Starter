import { Router } from 'express';

import { User } from '../models';

const router = Router();

router.get('/', (req, res) => {
  res.render('index.html');
});

// router.get('/protected', (req, res) => {
//   if (!req.user.admin) return res.sendStatus(401);
//   res.sendStatus(200);
// });

router.get('/api', (req, res) => {
  User.find({}, (err, users) => {
    if(err) throw err;
    console.log(users);
    res.end(JSON.stringify(users));
  });
});

export const route = router;
