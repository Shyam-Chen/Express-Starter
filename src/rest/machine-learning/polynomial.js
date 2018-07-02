import { Router } from 'express';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';

const router = Router();

router.get('/', async (req, res, next) => {
  const a = tf.variable(tf.scalar(Math.random()));
  const b = tf.variable(tf.scalar(Math.random()));
  const c = tf.variable(tf.scalar(Math.random()));
  const d = tf.variable(tf.scalar(Math.random()));

  // y = ax3 + bx2 + cx + d
  const predict = x =>
    // y = a * x ^ 3 + b * x ^ 2 + c * x + d
    tf.tidy(() =>
      a.mul(x.pow(tf.scalar(3))) // a * x^3
        .add(b.mul(x.square())) // + b * x ^ 2
        .add(c.mul(x)) // + c * x
        .add(d)); // + d

  // ...
});

export default router;
