import { Router } from 'express';
import { range } from 'lodash';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Form Controls API' });
});

router.get('/select', (req, res) => {
  res.json({ age: range(1, 101) });
});

router.get('/multiple-select', (req, res) => {
  res.json({
    countries: [
      'Taiwan',
      'Japan',
      'Korea',
      'China',
      'Singapore',
      'United States',
      'Canada',
      'Germany',
      'France',
      'Spain',
      'Netherlands',
      'United Kingdom'
    ]
  });
});

export default router;
