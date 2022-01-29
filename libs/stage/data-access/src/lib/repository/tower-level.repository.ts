import { Level } from '@death-tower/core/interfaces';
import { BehaviorSubject, map } from 'rxjs';

const LEVELS: Level[] = [
  {
    id: 'training',
    name: 'Treino',
    x: { min: 15, max: 20 },
    y: { min: 15, max: 20 },
  },
  {
    id: 'easy',
    name: 'Fácil',
    x: { min: 30, max: 40 },
    y: { min: 30, max: 30 },
  },
  {
    id: 'medium',
    name: 'Médio',
    x: { min: 20, max: 45 },
    y: { min: 20, max: 35 },
  },
  {
    id: 'hard',
    name: 'Difícil',
    x: { min: 15, max: 58 },
    y: { min: 15, max: 40 },
  },
  {
    id: 'challenge',
    name: 'Desafio',
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  },
];

export class TowerLevelRepository {
  private _levels = new BehaviorSubject<Level[]>(LEVELS);
  private levels$ = this._levels.asObservable();

  getAll() {
    return this.levels$;
  }

  get(id: string) {
    return this.levels$.pipe(
      map((levels) => levels.find((level) => level.id === id)),
    );
  }
}
