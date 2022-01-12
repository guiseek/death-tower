import { IMAGE_TOKEN, providers } from './config'
import { ImageService } from '../services/image'
import { Config, ImageTypeIndex } from '../interfaces'
import { loadImage } from '../map'

export const image = providers.get<ImageService<ImageTypeIndex>>(IMAGE_TOKEN)

export function loadImages(config: Config) {
  // const standing = new URL(
  //   '../assets/player/zumbi/state=standing.png',
  //   import.meta.url
  // )
  // const jumping = new URL(
  //   '../assets/player/zumbi/state=jumping.png',
  //   import.meta.url
  // )
  // const jumpingdown = new URL(
  //   '../assets/player/zumbi/state=jumpingdown.png',
  //   import.meta.url
  // )
  // const running = new URL(
  //   '../assets/player/zumbi/state=running.png',
  //   import.meta.url
  // )
  // const walking = new URL(
  //   '../assets/player/zumbi/state=walking.png',
  //   import.meta.url
  // )

  // loadImage(config, standing.pathname, 'standing', 0, false)
  // loadImage(config, standing.pathname, 'standing', 1, true)
  // loadImage(config, jumping.pathname, 'jumpingUp', 0, false)
  // loadImage(config, jumping.pathname, 'jumpingUp', 1, true)
  // loadImage(config, jumpingdown.pathname, 'jumpingDown', 0, false)
  // loadImage(config, jumpingdown.pathname, 'jumpingDown', 1, true)
  // loadImage(config, running.pathname, 'runningLeft', 0, false)
  // loadImage(config, running.pathname, 'runningLeft', 1, false)
  // loadImage(config, walking.pathname, 'runningLeft', 2, false)
  // loadImage(config, walking.pathname, 'runningLeft', 3, false)
  // loadImage(config, running.pathname, 'runningRight', 0, true)
  // loadImage(config, running.pathname, 'runningRight', 1, true)
  // loadImage(config, walking.pathname, 'runningRight', 2, true)
  // loadImage(config, walking.pathname, 'runningRight', 3, true)
  // const standing = new URL('../assets/player/zumbi/state=standing.png', import.meta.url)
  // const jumping = new URL('../assets/player/zumbi/state=jumping.png', import.meta.url)
  // const jumpingdown = new URL('../assets/player/zumbi/state=jumpingdown.png', import.meta.url)
  // const running = new URL('../assets/player/zumbi/state=running.png', import.meta.url)
  // const walking = new URL('../assets/player/zumbi/state=walking.png', import.meta.url)

  // image.add(config, standing.pathname, 'standing', 0, false)
  // image.add(config, standing.pathname, 'standing', 1, true)
  // image.add(config, jumping.pathname, 'jumpingUp', 0, false)
  // image.add(config, jumping.pathname, 'jumpingUp', 1, true)
  // image.add(config, jumpingdown.pathname, 'jumpingDown', 0, false)
  // image.add(config, jumpingdown.pathname, 'jumpingDown', 1, true)
  // image.add(config, running.pathname, 'runningLeft', 0, false)
  // image.add(config, running.pathname, 'runningLeft', 1, false)
  // image.add(config, walking.pathname, 'runningLeft', 2, false)
  // image.add(config, walking.pathname, 'runningLeft', 3, false)
  // image.add(config, running.pathname, 'runningRight', 0, true)
  // image.add(config, running.pathname, 'runningRight', 1, true)
  // image.add(config, walking.pathname, 'runningRight', 2, true)
  // image.add(config, walking.pathname, 'runningRight', 3, true)
}