import Router from '@koa/router';

const router = new Router({ prefix: '/recaptcha/api' });

router.post('/siteverify', ctx => {
  ctx.body = {
    success: true,
    challenge_ts: '2021-04-14T08:05:01Z',
    hostname: 'example.com',
  };
});

export default router;
