/**
 * @example
 * await ctx.sleep(2000);
 */

import { delayFunc } from './delay';

export default () => {
  function patch(ctx) {
    ctx.sleep = delayFunc;
    return ctx;
  }

  return (ctx, next) => {
    patch(ctx);
    return next();
  };
};
