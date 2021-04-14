/**
 * @example
 * app.use(delay(2000));
 */

export function delayFunc(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default (ms) => {
  return async (ctx, next) => {
    await delayFunc(ms);
    return next();
  };
};
