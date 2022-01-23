export function drawTowerShadow(
  ctx: CanvasRenderingContext2D,
  start: number,
  width: number,
  height: number,
  from: string,
  to: string
) {
  const grd = ctx.createLinearGradient(start, 0, start + width, 0)
  grd.addColorStop(0, from)
  grd.addColorStop(1, to)

  ctx.fillStyle = grd
  ctx.fillRect(start, 0, width, height)
}
