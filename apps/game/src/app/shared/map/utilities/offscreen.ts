export class OffScreen {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(public width: number, public height: number) {
    const canvas = document.createElement('canvas')
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas = canvas
    this.canvas.width = width
    this.canvas.height = height
  }
}
