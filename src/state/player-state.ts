import { Point } from '../map/point'
import { State } from './state'

interface Player {
  grounded: boolean
  boosting: boolean
  jumping: boolean
  running: boolean
  platform: number
  paused: boolean
  dir: number
  pos: Point
  speed: number
}

export class PlayerState extends State<Player> {
  grounded$ = this.select((state) => state.grounded)
  boosting$ = this.select((state) => state.boosting)
  jumping$ = this.select((state) => state.jumping)
  running$ = this.select((state) => state.running)
  platform$ = this.select((state) => state.platform)
  paused$ = this.select((state) => state.paused)
  dir$ = this.select((state) => state.dir)
  pos$ = this.select((state) => state.pos)
  speed$ = this.select((state) => state.speed)

  boost() {
    this.setState({ boosting: true })
  }
  jumpUp() {
    this.setState({ jumping: true, boosting: true, grounded: false })
  }
  jumpDown() {
    this.setState({ jumping: false, boosting: false })
  }

  setSpeed(speed: number) {
    this.setState({ speed })
  }
  setPlatform(platform: number) {
    this.setState({ platform })
  }
  
  run() {
    this.setState({ running: true })
  }
  idle() {
    this.setState({ running: false })
  }

  pause() {
    this.setState({ paused: true })
  }
  resume() {
    this.setState({ paused: false })
  }
  toTurn(dir: number) {
    this.setState({ dir })
  }

  get grounded() {
    return this.state.grounded
  }
  get boosting() {
    return this.state.boosting
  }
  get jumping() {
    return this.state.jumping
  }
  get running() {
    return this.state.running
  }
  get paused() {
    return this.state.paused
  }
  get platform() {
    return this.state.platform
  }
  get speed() {
    return this.state.speed
  }
  get pos() {
    return this.state.pos
  }
  get dir() {
    return this.state.dir
  }
}

const playerState = new PlayerState({
  grounded: false,
  boosting: false,
  jumping: false,
  running: false,
  paused: false,
  platform: 0,
  dir: 1,
  pos: new Point(0, 0),
  speed: 0,
})

export { playerState }
