import { Config } from '../../interfaces/config'

export function move(config: Config, e: KeyboardEvent, keyDown: boolean) {
  if (e.keyCode === 37) config.input.left = keyDown
  if (e.keyCode === 39) config.input.right = keyDown
  if (e.keyCode === 32) config.input.jump = keyDown
}
