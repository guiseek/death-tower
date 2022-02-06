import { LevelDataRepository } from './level-data.repository';
import { Level } from '@death-tower/core/interfaces';

describe('LevelDataRepository', () => {
  let levelRepository: LevelDataRepository;

  beforeEach(() => {
    levelRepository = new LevelDataRepository();
  });

  it('should create', () => {
    expect(levelRepository).toBeTruthy();
  });

  it('should get all levels', async () => {
    const levels$ = levelRepository.getAll();
    jest.spyOn(levels$, 'subscribe');

    const levels = [];

    const sub$ = levels$.subscribe((result) => {
      levels.push(...result);
      sub$.unsubscribe();
    });

    expect(levels.length).toBeGreaterThanOrEqual(5);
    expect(levels$.subscribe).toHaveBeenCalled();
  });

  it('should get level', async () => {
    const easy$ = levelRepository.getLevel('easy');

    jest.spyOn(easy$, 'subscribe');

    let level: Partial<Level> = {};

    const sub$ = easy$.subscribe((result) => {
      level = result;
      sub$.unsubscribe();
    });

    expect(level.name).toEqual('Fácil');
    expect(easy$.subscribe).toHaveBeenCalled();
  });
});
