import { OffScreen } from '../offscreen';

export function drawDoor(
  offscreen: OffScreen,
  color: CanvasPattern | string,
  x: number,
  width: number,
  height: number,
  bg?: string
) {
  const y = 90;

  if (bg) {
    offscreen.ctx.fillStyle = bg;
    offscreen.ctx.fillRect(
      0,
      0,
      offscreen.canvas.width,
      offscreen.canvas.height
    );
  }

  offscreen.ctx.fillStyle = color;
  offscreen.ctx.beginPath();
  offscreen.ctx.moveTo(x, y);
  offscreen.ctx.lineTo(x, y + height);
  offscreen.ctx.lineTo(x + width, y + height);
  offscreen.ctx.lineTo(x + width, y);
  offscreen.ctx.ellipse(x + width / 2, y, width / 2, 90, 0, 0, Math.PI, true);
  offscreen.ctx.fill();

  return offscreen.canvas;
}
