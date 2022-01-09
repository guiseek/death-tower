import { InjectionToken } from 'service-seeker/lib/src/core/injection-token'
import { AudioService } from './services/audio'
import { Injector } from 'service-seeker'

export const AUDIO_TOKEN = new InjectionToken('audio')

export const providers = Injector.create([
  {
    provide: AUDIO_TOKEN,
    useClass: AudioService,
  }
])
