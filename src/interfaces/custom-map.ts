import { LevelType } from './level'
import { Point } from '../map'

export interface CustomMap {
  level: LevelType
  positions: Point[]
}
