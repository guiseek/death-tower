export class OffScreen {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(public width: number, public height: number) {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    this.ctx = c.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = c;
  }
}
