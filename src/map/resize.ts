import { Arch } from '../interfaces/arch'

export function resize($: Arch) {
  $.rect = $.container!.getBoundingClientRect()

  if ($.canvas!.height > window.innerHeight) {
    // $.container!.style.transform = `scale(${
    //   window.innerHeight / $.canvas!.height
    // })`
  }
}
