import { Level } from '../../interfaces/level'

export function getRandomPositions(level: Level, length = 80) {
  let x = 0
  let y = 0

  const between = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return new Array(length).fill({ x, y }).map(() => {
    x = !!x ? between(x - level.min, x - level.max) : 1600
    y = !!y ? between(y - level.min, y - level.max) : 600
    return { x, y }
  })
}
