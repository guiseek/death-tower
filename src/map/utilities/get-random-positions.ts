import { Level } from '../../interfaces/level'

export function getRandomPositions(level: Level, length = 80) {
  const initial = {
    x: 1600,
    y: 600
  }

  let x = 0
  let y = 0

  const between = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return new Array(length).fill({ x, y }).map(() => {
    x = !!x ? between(x - level.min, x - level.max) : initial.x
    y = !!y ? between(y - (level.min - 20), y - ((level.max * 2) - 20)) : initial.y
    return { x, y }
  })
}
