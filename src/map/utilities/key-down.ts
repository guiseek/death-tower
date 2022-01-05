import { Arch } from '../../interfaces/arch'
import { move } from './move'

export function keyDown($: Arch, e: KeyboardEvent) {
  move($, e, true)
}
