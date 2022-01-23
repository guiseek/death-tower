export function getCirclePoint(radius: number, center: number, angle: number) {
  return center + radius * Math.cos((angle / 180) * Math.PI);
}
