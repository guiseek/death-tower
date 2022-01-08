import { Config } from '../../interfaces/config'
import { move } from './move'

export function keyDown(config: Config, e: KeyboardEvent) {
  move(config, e, true)
}
