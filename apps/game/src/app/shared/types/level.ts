export interface Range {
  min: number
  max: number
}
export interface Level {
  x: Range
  y: Range
}

export type LevelType = 'easy' | 'medium' | 'hard'
