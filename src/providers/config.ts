import { InjectionToken } from 'service-seeker/lib/src/core/injection-token'
import { ImageService } from '../services/image'
import { AudioService } from '../services/audio'
import { Injector } from 'service-seeker'

export const IMAGE_TOKEN = new InjectionToken('image')
export const AUDIO_TOKEN = new InjectionToken('audio')
export const PLAYER_STATE_TOKEN = new InjectionToken('player-state')

export const providers = Injector.create([
  {
    provide: IMAGE_TOKEN,
    useClass: ImageService,
  },
  {
    provide: AUDIO_TOKEN,
    useClass: AudioService,
  }
])
