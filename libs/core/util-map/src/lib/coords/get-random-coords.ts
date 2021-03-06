import { Level } from '@death-tower/core/interfaces';

export function getRandomCoords(level: Level, length = 80) {
  let x = 0;
  let y = 0;

  const between = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return new Array(length).fill({ x, y }).map(() => {
    x = x === 0 ? 1600 : between(x - level.platforms.x.min, x - level.platforms.x.max);

    y = y === 0 ? 600 : between(y - (level.platforms.y.min - 20), y - level.platforms.y.max * 2.5);

    return { x, y };
  });
}
