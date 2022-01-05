export function getCirclePoint(radius: number, center: number, angle: number) {
  var radian = (angle / 180) * Math.PI

  return center + radius * Math.cos(radian)
}
