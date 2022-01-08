import { Config } from '../../interfaces/config'
import { move } from './move'

export function keyUp($: Config, e: KeyboardEvent) {
  move($, e, false)
}
