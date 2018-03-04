import textList from './text-list';

describe('Text List', () => {
  it('should handle routes', () => {
    const router = textList;

    router.stack.forEach((handler) => {
      // TODO: inject
      expect(handler.route).toBeDefined();
    });
  });
});
