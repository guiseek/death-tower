import { Config, ImageType } from '../interfaces'
import { OffScreen } from './../map/offscreen'
import { Injectable } from 'service-seeker'

@Injectable()
export class ImageService<Types extends string> {
  private _image = new Map<Types, HTMLImageElement>([])

  add(
    config: Config,
    src: string,
    type: ImageType,
    index: number,
    flipped: boolean
  ) {
    let temp = new OffScreen(317, 300),
      image = new Image()

    image.onload = function () {
      if (flipped) {
        temp.ctx.save()
        temp.ctx.scale(-1, 1)
      }

      temp.ctx.drawImage(image, 0, 0, 317 * (flipped ? -1 : 1), 300)

      if (flipped) {
        temp.ctx.restore()
      }

      config.animationFrames[type][index] = temp.canvas
    }

    image.src = src

    const typeIndex = `${type}:${index}` as Types

    this._image.set(typeIndex, image)

    return temp.canvas
  }

  get(type: Types) {
    return this._image.get(type)
  }
}
