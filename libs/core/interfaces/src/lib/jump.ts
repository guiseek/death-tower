export interface Jump {
  isGrounded: boolean;
  isJumping: boolean;
  isBoosting: boolean;
  isFlipping: boolean;
  speed: number;
  nextY: number;
}
