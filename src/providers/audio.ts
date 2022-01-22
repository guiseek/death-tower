import { AudioActionConfig } from "../interfaces"

const timeWavePassBy4 = new URL('../assets/sound/time/time-wave-pass-by-4.mp3', import.meta.url)
const timeWaveRipple2 = new URL('../assets/sound/time/time-wave-ripple-2.mp3', import.meta.url)
const clockTicking = new URL('../assets/sound/ambient/clock-ticking.mp3', import.meta.url)
const thunder = new URL('../assets/sound/thunder-rumble.mp3', import.meta.url)
const yeaah = new URL('../assets/sound/zumbi/yeaah.mp3', import.meta.url)
const scream = new URL('../assets/sound/scream.mp3', import.meta.url)
const running = new URL('../assets/sound/running.mp3', import.meta.url)
const jumpSpringUp = new URL('../assets/sound/jump-spring.mp3', import.meta.url)
const jumpSpringDown = new URL('../assets/sound/jump-spring-down.mp3', import.meta.url)

export const audioAction: AudioActionConfig = {
  timeWavePassBy4: new Audio(timeWavePassBy4.pathname),
  timeWaveRipple2: new Audio(timeWaveRipple2.pathname),
  jumpSpringDown: new Audio(jumpSpringDown.pathname),
  clockTicking: new Audio(clockTicking.pathname),
  jumpSpringUp: new Audio(jumpSpringUp.pathname),
  running: new Audio(running.pathname),
  thunder: new Audio(thunder.pathname),
  scream: new Audio(scream.pathname),
  yeaah: new Audio(yeaah.pathname),
}