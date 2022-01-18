export function getEqualsPoints(nX = 48, nY = 48) {
  let x = 0;
  let y = 0;

  return new Array(50).fill(0).map(() => {
    x = x ? x + nX : 1600;
    y = y ? y - nY : 600;
    return { x, y };
  });
}
