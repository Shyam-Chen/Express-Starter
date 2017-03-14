import { Router } from 'express';

import { List } from '../models';

const listRouter = Router();

listRouter.get('/', (req, res, next) => {
  List.find({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

export const listRoutes = listRouter;
