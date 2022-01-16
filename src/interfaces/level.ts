export interface Range {
  min: number
  max: number
}
export interface Level {
  x: Range
  y: Range
}

export type LevelType = 'easy' | 'medium' | 'hard'

export type Levels = { [key in LevelType]: Level }