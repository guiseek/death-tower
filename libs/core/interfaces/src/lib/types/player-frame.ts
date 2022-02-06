export type PlayerFrame =
  | 'standing'
  | 'jumpingUp'
  | 'jumpingDown'
  | 'runningLeft'
  | 'jumpingTrick'
  | 'runningRight'
  | `frontFlip`
  | `frontFlip${number}`
  | 'fall1'
  | 'fall2';
