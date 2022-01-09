import { Level, Levels, LevelType } from '../interfaces/level'

const levels: Levels = {
  easy: { min: 30, max: 40 },
  medium: { min: 20, max: 45 },
  hard: { min: 15, max: 58 },
}

function isLevelType(level: string): level is LevelType {
  return Object.keys(levels).includes(level)
}

export function getLevel(type: string): Level
export function getLevel(type: LevelType): Level
export function getLevel(type: LevelType | string): Level {
  return isLevelType(type) ? levels[type] : levels.easy
}
