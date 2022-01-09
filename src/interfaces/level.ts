export interface Level {
  min: number
  max: number
}

export type LevelType = 'easy' | 'medium' | 'hard'

export type Levels = { [key in LevelType]: Level }