import { AnimationFramesConfig } from './animation-frames-config';

export interface DOMConfig {
  container: HTMLElement | null;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  rect: DOMRect | null;
  animationFrames: AnimationFramesConfig;
}
