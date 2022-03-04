import { coreGamepad } from './core-gamepad';

describe('coreGamepad', () => {
  it('should work', () => {
    const gamepad = coreGamepad((gamepad: Gamepad) => {
      expect(gamepad).toBeDefined();
    });

    expect(gamepad).toBeDefined();
  });
});
