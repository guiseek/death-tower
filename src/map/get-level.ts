import { Level, Levels, LevelType } from '../interfaces/level'

const levels: Levels = {
  easy: { min: 20, max: 40 },
  medium: { min: 30, max: 40 },
  hard: { min: 40, max: 60 },
}

function isLevelType(level: string): level is LevelType {
  return Object.keys(levels).includes(level)
}

export function getLevel(type: string): Level
export function getLevel(type: LevelType): Level
export function getLevel(type: LevelType | string): Level {
  return isLevelType(type) ? levels[type] : levels.easy
}
