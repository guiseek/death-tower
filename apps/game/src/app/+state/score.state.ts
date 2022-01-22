import { State } from './state';

interface Score {
  score: number;
}

export class ScoreState extends State<Score> {
  score$ = this.select((state) => state.score);

  constructor(initialState: Score = { score: 0 }) {
    super(initialState);
  }

  update(score: number) {
    this.setState({ score });
  }

  increment(value: number) {
    const score = this.state.score + value;
    this.setState({ score });
  }
}
