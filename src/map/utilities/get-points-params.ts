export function getPointsParams(params: string) {
  const search = new URLSearchParams(params)
  const points = search.get('points')

  return (points ?? '').split(';').map((point) => {
    const [x, y] = point.split(',')
    // Converte hexadecimais para decimais
    return { x: parseInt(x, 16), y: parseInt(y, 16) }
  })
}