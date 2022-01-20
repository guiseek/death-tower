export function getPointsByParams(params: string) {
  const search = new URLSearchParams(params)
  const points = search.get('points')

  if (!points) return []

  return points.split(';').map((point) => {
    const [x, y] = point.split(',')
    return { x: +x, y: +y }
  })
}