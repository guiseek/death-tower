import { Point } from '../map/point'
import { State } from './state'

interface Player {
  jumping: boolean
  running: boolean
  paused: boolean
  dir: number
  pos: Point
  speed: number
}

export class PlayerState extends State<Player> {
  jumping$ = this.select((state) => state.jumping)
  running$ = this.select((state) => state.running)
  paused$ = this.select((state) => state.paused)
  dir$ = this.select((state) => state.dir)
  pos$ = this.select((state) => state.pos)
  speed$ = this.select((state) => state.speed)

  jumpUp() {
    this.setState({ jumping: true })
  }
  jumpDown() {
    this.setState({ jumping: false })
  }

  run() {
    this.setState({ running: true })
  }
  idle() {
    this.setState({ running: false })
  }
}

const playerState = new PlayerState({
  jumping: false,
  running: false,
  paused: false,
  dir: 1,
  pos: new Point(0, 0),
  speed: 0,
})

export { playerState }
