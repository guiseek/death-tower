import { Arch } from '../../interfaces/arch'
import { move } from './move'

export function keyUp($: Arch, e: KeyboardEvent) {
  move($, e, false)
}
