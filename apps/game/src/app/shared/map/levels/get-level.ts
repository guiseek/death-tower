import { Level, Levels, LevelType } from '../../types/level';

const levels: Levels = {
  training: {
    x: {
      min: 15,
      max: 20,
    },
    y: {
      min: 15,
      max: 20,
    },
  },
  easy: {
    x: { min: 30, max: 40 },
    y: { min: 30, max: 30 },
  },
  medium: {
    x: { min: 20, max: 45 },
    y: { min: 20, max: 35 },
  },
  hard: {
    x: { min: 15, max: 58 },
    y: { min: 15, max: 40 },
  },
};

function isLevelType(level: string): level is LevelType {
  return Object.keys(levels).includes(level);
}

export function getLevel(type: string): Level;
export function getLevel(type: LevelType): Level;
export function getLevel(type: LevelType | string): Level {
  return isLevelType(type) ? levels[type] : levels.training;
}
