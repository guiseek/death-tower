import { getCirclePoint } from '../utilities/get-circle-point'
import { Config } from '../../interfaces/config'
import { OffScreen } from '../offscreen'
import { drawDoor } from './draw-door'

export class Door {
  constructor(public x: number, public y: number) {
    this.x = x
    this.y = y
  }

  draw($: Config) {
    const center = this.x - $.state.pos.x
    const l = getCirclePoint(600, 800, center - $.platform.width / 2)
    const r = getCirclePoint(600, 800, center + $.platform.width / 2)

    if (l > r) {
      const sl = getCirclePoint(560, 800, center - $.platform.width / 2)
      const sr = getCirclePoint(560, 800, center + $.platform.width / 2)
      const c = new OffScreen(1600, 250)
      const sc = new OffScreen(1600, 250)
      
      const smallDoor = drawDoor(sc, '#2A3849', sr, sl - sr, 250, '#262525')
      
      const p = $.ctx!.createPattern(smallDoor, 'no-repeat') as CanvasPattern
      const bigDoor = drawDoor(c, p, r, l - r, 250)

      $.ctx!.drawImage(bigDoor, 0, this.y + $.state.pos.y)
    }
  }
}
