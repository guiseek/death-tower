export function easing(n: number) {
  // https://github.com/component/ease
  const s = 1.70158
  return --n * n * ((s + 1) * n + s) + 1
}
