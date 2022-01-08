import { Config } from '../../interfaces/config'

export function move($: Config, e: KeyboardEvent, keyDown: boolean) {
  if (e.keyCode === 37) $.input.left = keyDown
  if (e.keyCode === 39) $.input.right = keyDown
  if (e.keyCode === 32) $.input.jump = keyDown
}
