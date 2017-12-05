import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { SECRET } from '~/env';
import { User } from '~/document';

const router = Router();

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (!user) return next(err);

    user.comparePassword(password, (passwordError, isMatch) => {
      if (!isMatch) return next(passwordError);

      const token = jwt.sign({ user }, SECRET);
      res.json({ token });
    });
  });
});

router.get('/users', (req, res, next) => {
  User.find({}, (err, docs) => {
    if (err) return next(err);
    res.json(docs);
  });
});

router.get('/users/count', (req, res, next) => {
  User.count((err, count) => {
    if (err) return next(err);
    res.json(count);
  });
});

router.post('/user', (req, res, next) => {
  const user = new User(req.body);

  user.save((err, item) => {
    if (err) return next(err);
    res.json(item);
  });
});

router.get('/user/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.put('/user/:id', (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, err => {
    if (err) return next(err);
    res.json({ message: 'Updated' });
  });
});

router.delete('/user/:id', (req, res, next) => {
  User.findOneAndRemove({ _id: req.params.id }, err => {
    if (err) return next(err);
    res.json({ message: 'Deleted' });
  });
});

export default router;
