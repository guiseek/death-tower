import { Config } from '../../interfaces/config'

export function move(config: Config, e: KeyboardEvent, keyDown: boolean) {
  if (e.key === 'ArrowLeft') config.input.left = keyDown
  if (e.key === 'ArrowRight') config.input.right = keyDown
  if (e.key === 'ArrowDown') config.input.flip = keyDown
  if (e.key === ' ') config.input.jump = keyDown
}
