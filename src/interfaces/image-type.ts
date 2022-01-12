export type ImageType =
  | 'standing'
  | 'jumpingUp'
  | 'jumpingDown'
  | 'runningLeft'
  | 'runningRight'

export type ImageTypeIndex = `${ImageType}:${number}`