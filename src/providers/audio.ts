import { AudioType } from '../interfaces/audio-type'
import { AUDIO_TOKEN, providers } from './config'
import { AudioService } from '../services/audio'

export const audio = providers.get<AudioService<AudioType>>(AUDIO_TOKEN)

audio.add('thunder', new URL('../assets/sound/thunder-rumble.mp3', import.meta.url))
audio.add('yeaah', new URL('../assets/sound/zumbi/yeaah.mp3', import.meta.url))
audio.add('scream', new URL('../assets/sound/zumbi/scream.mp3', import.meta.url))
audio.add('running', new URL('../assets/sound/running.mp3', import.meta.url))
audio.add('jumpSpringUp', new URL('../assets/sound/jump-spring.mp3', import.meta.url))
audio.add('jumpSpringDown', new URL('../assets/sound/jump-spring-down.mp3', import.meta.url))
