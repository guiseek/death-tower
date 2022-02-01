import { LevelRepository } from '@death-tower/stage/domain';
import { Level } from '@death-tower/core/interfaces';
import { BehaviorSubject, map } from 'rxjs';
import { LEVELS } from '../data/levels';


export class LevelDataRepository implements LevelRepository {
  private _levels = new BehaviorSubject<Level[]>(LEVELS);
  private levels$ = this._levels.asObservable();

  getAll() {
    return this.levels$;
  }

  getLevel(id: string) {
    return this.levels$.pipe(
      map((levels) => levels.find((level) => level.id === id) as Level)
    );
  }
}
