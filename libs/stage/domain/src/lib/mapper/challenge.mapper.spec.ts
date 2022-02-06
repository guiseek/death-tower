import { ChallengeMapper } from './challenge.mapper';

describe('ChallengeMapper', () => {
  let mapper: ChallengeMapper;

  beforeEach(() => {
    mapper = new ChallengeMapper();
  });

  it('should create', () => {
    expect(mapper).toBeTruthy();
  });

  it('should map from', () => {
    const query = '1,2;3,4;5,6';

    const result = mapper.mapFrom(query);

    expect(result).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ]);
  });

  it('should map to', () => {
    const coords = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 6 },
    ];

    const result = mapper.mapTo(coords);

    expect(result).toEqual('1,2;3,4;5,6');
  });

  it('should map from and to', () => {
    const query = '1,2;3,4;5,6';
    const result = mapper.mapFrom(query);
    const result2 = mapper.mapTo(result);

    expect(result2).toEqual(query);
  });
});
