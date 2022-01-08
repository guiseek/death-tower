import { Config } from '../interfaces/config'

export function resize($: Config) {
  $.rect = $.container!.getBoundingClientRect()

  if ($.canvas!.height > window.innerHeight) {
    // $.container!.style.transform = `scale(${
    //   window.innerHeight / $.canvas!.height
    // })`
  }
}
