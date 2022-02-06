import { PlayerFrame } from './types/player-frame';

export interface DOMConfig {
  container: HTMLElement | null;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  rect: DOMRect | null;
  animationFrames: Record<PlayerFrame, HTMLCanvasElement[]>;
}
