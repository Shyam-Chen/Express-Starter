import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Backend Starter Kit');
});

router.get('/api', (req, res) => {
  res.json({
    notes: '...'
  });
});

router.post('/api', (req, res) => {
	if(!req.body.notes || typeof req.body.notes !== 'string') {
    res.status(400).send('400 Bad Request');
	}

	req.user.customData.notes = req.body.notes;
	req.user.customData.save();
	res.status(200).end();
})

router.put('/api/:coll', (req, res) => {
  res.send();
});

router.delete('/api/:coll', (req, res) => {
  res.send();
});

export const route = router;
