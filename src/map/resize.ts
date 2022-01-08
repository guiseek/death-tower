import { Config } from '../interfaces/config'

export function resize(config: Config) {
  config.rect = config.container!.getBoundingClientRect()

  if (config.canvas!.height > window.innerHeight) {
    // config.container!.style.transform = `scale(${
    //   window.innerHeight / config.canvas!.height
    // })`
  }
}
