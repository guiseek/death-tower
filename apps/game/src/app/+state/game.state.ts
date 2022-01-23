import { Coord, Platform } from '@death-tower/core/util-map';
import { Level } from '@death-tower/core/interfaces';
import { State } from './state';

interface Game {
  platforms: Platform[];
  coords: Coord[];
  levels: Level[];
}

const initialState: Game = {
  platforms: [],
  coords: [],
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
  ],
};

export class GameState extends State<Game> {
  public platforms$ = this.select((state) => state.platforms);
  public coords$ = this.select((state) => state.coords);
  public levels$ = this.select((state) => state.levels);

  constructor() {
    super(initialState);
  }

  loadLevel(levelId: Level['id']) {
    const predicate = (level: Level) => level.id === levelId;
    let level = this.state.levels.find(predicate);

    if (!level) level = this.state.levels[0];

    const length = ((level.x.min + level.x.max) / 2) | 0;
    const coords = this.getRandomCoords(level, length);

    const mapper = ({ x, y }: Coord) => new Platform(x, y);
    const platforms = coords.map(mapper)

    this.setState({ coords, platforms });
  }

  private getRandomCoords(level: Level, length = 80) {
    let x = 0;
    let y = 0;

    const between = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return new Array(length).fill({ x, y }).map(() => {
      x = x === 0 ? 1600 : between(x - level.x.min, x - level.x.max);

      y = y === 0 ? 600 : between(y - (level.y.min - 20), y - level.y.max * 2.5);

      return { x, y };
    });
  }
}
