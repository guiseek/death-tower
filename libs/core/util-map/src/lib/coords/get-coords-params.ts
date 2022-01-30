export function getCoordsParams(params: string) {
  const search = new URLSearchParams(params);
  const coords = search.get('coords');

  return (coords ?? '').split(';').map((coord) => {
    const [x, y] = coord.split(',');
    // Converte hexadecimais para decimais
    return { x: parseInt(x, 16), y: parseInt(y, 16) };
  });
}
