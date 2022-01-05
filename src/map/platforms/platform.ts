import { drawPolygon } from '../draw-polygon'
import { Arch } from '../../interfaces/arch'
import { getBox } from '../get-box'
import { Point } from '../point'

let INC = 0

export class Platform {
  n = INC++

  infront: boolean
  outerBox: {
    left: any
    right: any
    width: number
    unit: number
  } | null

  constructor(public x: number, public y: number) {
    this.x = x
    this.y = y
    this.infront = false
    this.outerBox = null
  }

  getY($: Arch) {
    return this.y + $.state.pos.y
  }

  isInFront($: Arch) {
    let center = this.x - $.state.pos.x,
      innerBox = getBox($, 600, center),
      outerBox = getBox($, 680, center)

    this.infront = outerBox.left > outerBox.right
    return this.infront
  }

  drawFront($: Arch) {
    $.ctx!.fillStyle = $.colors.wood2
    $.ctx!.fillRect(
      this.outerBox!.left,
      this.getY($),
      this.outerBox!.width,
      $.platform.height
    )
  }

  draw($: Arch) {
    let center = this.x - $.state.pos.x,
      innerBox = getBox($, 600, center),
      outerBox = getBox($, 680, center),
      isLeftSide = innerBox.left > outerBox.left

    this.infront = outerBox.left > outerBox.right

    for (let dir of ['left', 'right']) {
      let adjust = dir === 'left' ? outerBox.unit : outerBox.unit * 6,
        outer = {
          top: {
            left: new Point(
              outerBox.left + adjust,
              this.getY($) + $.platform.height
            ),
            right: new Point(
              outerBox.left + outerBox.unit + adjust,
              this.getY($) + $.platform.height
            ),
          },
          bottom: {
            left: new Point(innerBox.left + adjust, this.getY($) + 70),
            right: new Point(
              innerBox.left + innerBox.unit + adjust,
              this.getY($) + 70
            ),
          },
        },
        inner = {
          top: {
            left: new Point(
              outerBox.left + adjust,
              this.getY($) + ($.platform.height - 10)
            ),
            right: new Point(
              outerBox.left + outerBox.unit + adjust,
              this.getY($) + ($.platform.height - 10)
            ),
          },
          bottom: {
            left: new Point(innerBox.left + adjust, this.getY($) + 60),
            right: new Point(
              innerBox.left + innerBox.unit + adjust,
              this.getY($) + 60
            ),
          },
        }

      drawPolygon(
        $,
        $.colors.wood3,
        inner.top.left,
        inner.bottom.left,
        inner.bottom.right,
        inner.top.right
      )
      drawPolygon(
        $,
        $.colors.wood4,
        outer.top.left,
        outer.bottom.left,
        outer.bottom.right,
        outer.top.right
      )

      if (!isLeftSide) {
        drawPolygon(
          $,
          $.colors.wood5,
          inner.top.right,
          outer.top.right,
          outer.bottom.right,
          inner.bottom.right
        )
      } else {
        drawPolygon(
          $,
          $.colors.wood5,
          inner.top.left,
          outer.top.left,
          outer.bottom.left,
          inner.bottom.left
        )
      }
    }

    $.ctx!.fillStyle = $.colors.wood1
    if (isLeftSide) {
      $.ctx!.fillRect(
        innerBox.left,
        this.getY($),
        outerBox.left - innerBox.left,
        $.platform.height
      )
    } else {
      $.ctx!.fillRect(
        outerBox.right,
        this.getY($),
        innerBox.left - outerBox.left,
        $.platform.height
      )
    }

    this.outerBox = outerBox
  }
}
