export interface StorageConfig {
  bricks: Record<string, HTMLCanvasElement> | null;
  sky: HTMLCanvasElement | null;
  shadows: HTMLCanvasElement | null;
}
