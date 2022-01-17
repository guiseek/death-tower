export interface Range {
  min: number
  max: number
}
export interface Level {
  x: Range
  y: Range
}

export type LevelType = 'training' | 'easy' | 'medium' | 'hard'

export type Levels = { [key in LevelType]: Level }