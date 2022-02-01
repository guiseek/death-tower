import { Level } from '@death-tower/core/interfaces';
import { Observable } from 'rxjs';

export abstract class LevelRepository {
  abstract getAll(): Observable<Level[]>;

  abstract getLevel(id: string): Observable<Level>;
}
