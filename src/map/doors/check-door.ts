import { audio } from '../../providers/audio'
import { Config } from '../../interfaces'
import { Door } from './door'

export function checkDoor(config: Config, door: Door) {
  if (Math.abs(door.x - (config.state.pos.x + 40)) < 10) {
    if (!config.state.finished) {
      audio.get('yeaah')?.play()
      config.state.finished = true
    }
  }
}
