import { Level } from '../../interfaces/level'

export function getRandomPoints(level: Level, length = 80) {
  let x = 0
  let y = 0

  const between = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return new Array(length).fill({ x, y }).map((v, i) => {
    x = x === 0 ? 1600 : between(x - level.min, x - level.max)

    y = y === 0 ? 600 : between(y - (level.min - 20), y - ((level.max * 2) - 20))

    return { x, y }
  })
}
