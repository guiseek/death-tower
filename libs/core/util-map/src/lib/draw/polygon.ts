import { Config, Coord } from '@death-tower/core/interfaces';

export function drawPolygon(config: Config, color: string, ...coords: Coord[]) {
  if (config.ctx) {
    config.ctx.fillStyle = color;
    config.ctx.beginPath();
    config.ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      config.ctx.lineTo(coords[i].x, coords[i].y);
    }
    config.ctx.fill();
  }
}
