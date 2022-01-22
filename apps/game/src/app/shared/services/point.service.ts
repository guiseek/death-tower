import { Level, LevelType } from '../types/level';
import { StateService } from './state.service';
import { Point } from '../map/utilities/point';
import { Injectable } from '@angular/core';
import { getRandomPoints } from '../map/utilities/math/get-random-points';

interface PointState {
  points: Point[];
  levels: { [key in LevelType]: Level };
}

const initialState: PointState = {
  points: [],
  levels: {
    training: {
      x: {
        min: 15,
        max: 20
      },
      y: {
        min: 15,
        max: 20
      }
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
    }
  },
}

@Injectable()
export class PointService extends StateService<PointState> {
  points$ = this.select(state => state.points);

  constructor() {
    super(initialState);
  }

  setPoints(type: LevelType) {
    const level = this.getLevel(type);
    const length = ((level.x.min + level.x.max) / 2) | 0;

    this.setState({ points: getRandomPoints(level, length) });
  }

  private getLevel(type: LevelType | string): Level {
    const levels = this.state.levels;

    return this.isLevelType(type) ? levels[type] : levels.easy;
  }

  private isLevelType(level: string): level is LevelType {
    return Object.keys(this.state.levels).includes(level);
  }
}
