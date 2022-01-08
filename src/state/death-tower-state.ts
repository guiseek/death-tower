import { StateValue } from './../interfaces/config';
import { State } from './state'

export class DeathTowerState extends State<StateValue> {
  lastPlatform$ = this.select((state) => state.lastPlatform)
  points$ = this.select((state) => state.points)
  player$ = this.select((state) => state.player)
  paused$ = this.select((state) => state.paused)
  jump$ = this.select((state) => state.jump)
  pos$ = this.select((state) => state.pos)

  setState(state: Partial<StateValue>) {
    super.setState({ ...this.state, ...state })
  }

  jump(jump: Partial<StateValue['jump']>) {
    this.setState({ jump: { ...this.state.jump, ...jump } })
  }

  player(player: Partial<StateValue['player']>) {

    this.setState({ player: { ...this.state.player, ...player } })
  }

  pos(pos: Partial<StateValue['pos']>) {
    this.setState({ pos: { ...this.state.pos, ...pos } })
  }

  pause() {
    this.setState({ paused: true })
  }

  resume() {
    this.setState({ paused: false })
  }

  points(points: number) {
    this.setState({ points })
  }
}
