import { rand } from './rand'

export class Particle {
  x: number
  y: number
  coordLast: { x: number; y: number }[]
  angle: number
  speed: number
  partSpeed: any
  partSpeedVariance: any
  friction: number
  partFriction!: number
  gravity: number
  partGravity!: number
  hue: number
  hueVariance!: number
  brightness: number
  alpha: number
  decay: number
  wind = 0
  lineWidth: any
  dt!: number
  particles: any
  ctx: any
  flickerDensity!: number
  constructor(x: number, y: number, hue: number) {
    this.x = x
    this.y = y
    this.coordLast = [
      { x: x, y: y },
      { x: x, y: y },
      { x: x, y: y },
    ]
    this.angle = rand(0, 360)
    this.speed = rand(
      this.partSpeed - this.partSpeedVariance <= 0
        ? 1
        : this.partSpeed - this.partSpeedVariance,
      this.partSpeed + this.partSpeedVariance
    )
    this.friction = 1 - this.partFriction / 100
    this.gravity = this.partGravity / 2
    this.hue = rand(hue - this.hueVariance, hue + this.hueVariance)
    this.brightness = rand(50, 80)
    this.alpha = rand(40, 100) / 100
    this.decay = rand(10, 50) / 1000
    // this.wind = (rand(0, this.partWind) - this.partWind / 2) / 25
    this.lineWidth = this.lineWidth
  }

  partWind(arg0: number, partWind: any) {
    throw new Error('Method not implemented.')
  }

  update(index: number) {
    const radians = (this.angle * Math.PI) / 180
    const vx = Math.cos(radians) * this.speed
    const vy = Math.sin(radians) * this.speed + this.gravity
    this.speed *= this.friction

    this.coordLast[2].x = this.coordLast[1].x
    this.coordLast[2].y = this.coordLast[1].y
    this.coordLast[1].x = this.coordLast[0].x
    this.coordLast[1].y = this.coordLast[0].y
    this.coordLast[0].x = this.x
    this.coordLast[0].y = this.y

    this.x += vx * this.dt
    this.y += vy * this.dt

    this.angle += this.wind
    this.alpha -= this.decay

    if (this.alpha < 0.05) {
      this.particles.splice(index, 1)
    }
  }

  draw() {
    const coordRand = rand(1, 3) - 1
    this.ctx.beginPath()
    this.ctx.moveTo(
      Math.round(this.coordLast[coordRand].x),
      Math.round(this.coordLast[coordRand].y)
    )
    this.ctx.lineTo(Math.round(this.x), Math.round(this.y))
    this.ctx.closePath()
    this.ctx.strokeStyle =
      'hsla(' +
      this.hue +
      ', 100%, ' +
      this.brightness +
      '%, ' +
      this.alpha +
      ')'
    this.ctx.stroke()

    if (this.flickerDensity > 0) {
      const inverseDensity = 50 - this.flickerDensity
      if (rand(0, inverseDensity) === inverseDensity) {
        this.ctx.beginPath()
        this.ctx.arc(
          Math.round(this.x),
          Math.round(this.y),
          rand(this.lineWidth, this.lineWidth + 3) / 2,
          0,
          Math.PI * 2,
          false
        )
        this.ctx.closePath()
        const randAlpha = rand(50, 100) / 100
        this.ctx.fillStyle =
          'hsla(' +
          this.hue +
          ', 100%, ' +
          this.brightness +
          '%, ' +
          randAlpha +
          ')'
        this.ctx.fill()
      }
    }
  }
}
