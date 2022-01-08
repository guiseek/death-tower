import { Config } from '../../interfaces/config'
import { move } from './move'

export function keyDown($: Config, e: KeyboardEvent) {
  move($, e, true)
}
