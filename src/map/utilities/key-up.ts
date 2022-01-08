import { Config } from '../../interfaces/config'
import { move } from './move'

export function keyUp(config: Config, e: KeyboardEvent) {
  move(config, e, false)
}
