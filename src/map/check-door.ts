import { StateValue } from '../interfaces'
import { Door } from './doors/door'

export function checkDoor(state: StateValue, door: Door, audio: HTMLAudioElement) {
  if (Math.abs(door.x - (state.pos.x + 40)) < 10) {
    if (!state.finished) {
      audio.play()
      state.finished = true
    }
  }
}
