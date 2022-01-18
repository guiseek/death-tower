export function getCirclePoint(radius: number, center: number, angle: number) {
  const radian = (angle / 180) * Math.PI;

  return center + radius * Math.cos(radian);
}
