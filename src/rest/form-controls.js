import { Router } from 'express';
import { range } from 'lodash';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Form Controls API' });
});

router.get('/select', (req, res) => {
  const age = range(1, 101);  // 1 ~ 100
  res.json({ age });
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
