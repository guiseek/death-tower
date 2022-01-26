import { Coord } from './coord';

export function getParamsCoords(coords: Coord[]) {
  // Convertendo decimais para hexadecimais
  const params = coords
    .map(({ x, y }) => `${x.toString(16)},${y.toString(16)}`)
    .join(';');
  const search = new URLSearchParams(location.search);
  search.set('coords', params);
  return search.toString();
}
