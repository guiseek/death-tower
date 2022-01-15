import { InjectionToken } from 'service-seeker/lib/src/core/injection-token'
import { TimerService } from './../services/timer'
import { AudioService } from '../services/audio'
import { ImageService } from '../services/image'
import { Injector } from 'service-seeker'

export const PLAYER_STATE_TOKEN = new InjectionToken('player-state')

export const AUDIO_TOKEN = new InjectionToken('audio')

export const providers = Injector.create([
  {
    provide: AUDIO_TOKEN,
    useClass: AudioService,
  },
  // {
  //   provide: IMAGE_TOKEN,
  //   useClass: ImageService,
  // },
  // {
  //   provide: TIMER_TOKEN,
  //   useClass: TimerService,
  // },
])
