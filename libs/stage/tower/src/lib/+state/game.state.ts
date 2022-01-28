import { Coord, Platform } from '@death-tower/core/util-map';
import { Level } from '@death-tower/core/interfaces';
import { Injectable } from '@angular/core';
import { State } from './state';

interface Game {
  platforms: Platform[];
  coords: Coord[];
  levels: Level[];
  level: Level | null;
}

const initialState: Game = {
  platforms: [],
  coords: [],
  level: null,
  levels: [
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
  ],
};

@Injectable({ providedIn: 'platform' })
export class GameState extends State<Game> {
  public platforms$ = this.select((state) => state.platforms);
  public coords$ = this.select((state) => state.coords);
  public levels$ = this.select((state) => state.levels);
  public level$ = this.select((state) => state.level);

  challengeCoords: Coord[] = [];

  constructor() {
    super(initialState);
  }

  loadLevel(levelId: Level['id'], query = '') {
    const predicate = (level: Level) => level.id === levelId;
    let level = this.state.levels.find(predicate);

    if (!level) level = this.state.levels[0];

    this.challengeCoords = query ? this.loadChallenge(query) : [];

    const coords =
      level.id === 'challenge' && this.challengeCoords.length > 0
        ? this.loadChallenge(query)
        : this.getRandomCoords(level, 36);

    this.setState({ level, coords, platforms: this.mapFromCoords(coords) });
  }

  private loadChallenge(queryParams: string) {
    return queryParams.split(';').map((point) => {
      const [x, y] = point.split(',');
      // Converte hexadecimais para decimais
      return { x: parseInt(x, 16), y: parseInt(y, 16) };
    });
  }

  private mapFromCoords(coords: Coord[]) {
    return coords.map(({ x, y }: Coord, i: number) => new Platform(x, y, i));
  }

  private getRandomCoords(level: Level, length = 40) {
    let x = 0;
    let y = 0;

    const between = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return new Array(length).fill({ x, y }).map(() => {
      x = x === 0 ? 1600 : between(x - level.x.min, x - level.x.max);

      y =
        y === 0 ? 600 : between(y - (level.y.min - 20), y - level.y.max * 2.5);

      return { x, y };
    });
  }
}
