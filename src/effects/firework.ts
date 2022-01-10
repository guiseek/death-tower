import { rand } from './rand'

export class Firework {
  x: number
  y: number
  startX: number
  startY: number
  hitX: boolean
  hitY: boolean
  coordLast: { x: number; y: number }[]
  targetX: number
  targetY: number
  speed: any
  fworkSpeed: any
  angle: number
  shockwaveAngle: number
  acceleration: number
  fworkAccel = 0
  hue: any
  currentHue: any
  brightness: any
  alpha: number
  lineWidth: any
  targetRadius: number
  ctx: any
  showTarget: any
  dt = 0
  fireworks: any
  showShockwave: any
  constructor(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number
  ) {
    this.x = startX
    this.y = startY
    this.startX = startX
    this.startY = startY
    this.hitX = false
    this.hitY = false
    this.coordLast = [
      { x: startX, y: startY },
      { x: startX, y: startY },
      { x: startX, y: startY },
    ]
    this.targetX = targetX
    this.targetY = targetY
    this.speed = this.fworkSpeed
    this.angle = Math.atan2(targetY - startY, targetX - startX)
    this.shockwaveAngle =
      Math.atan2(targetY - startY, targetX - startX) + 90 * (Math.PI / 180)
    this.acceleration = this.fworkAccel / 100
    this.hue = this.currentHue
    this.brightness = rand(50, 80)
    this.alpha = rand(50, 100) / 100
    this.lineWidth = this.lineWidth
    this.targetRadius = 1
  }

  update(index: number) {
    this.ctx.lineWidth = this.lineWidth

    const vx = Math.cos(this.angle) * this.speed
    const vy = Math.sin(this.angle) * this.speed
    this.speed *= 1 + this.acceleration
    this.coordLast[2].x = this.coordLast[1].x
    this.coordLast[2].y = this.coordLast[1].y
    this.coordLast[1].x = this.coordLast[0].x
    this.coordLast[1].y = this.coordLast[0].y
    this.coordLast[0].x = this.x
    this.coordLast[0].y = this.y

    if (this.showTarget) {
      if (this.targetRadius < 8) {
        this.targetRadius += 0.25 * this.dt
      } else {
        this.targetRadius = 1 * this.dt
      }
    }

    if (this.startX >= this.targetX) {
      if (this.x + vx <= this.targetX) {
        this.x = this.targetX
        this.hitX = true
      } else {
        this.x += vx * this.dt
      }
    } else {
      if (this.x + vx >= this.targetX) {
        this.x = this.targetX
        this.hitX = true
      } else {
        this.x += vx * this.dt
      }
    }

    if (this.startY >= this.targetY) {
      if (this.y + vy <= this.targetY) {
        this.y = this.targetY
        this.hitY = true
      } else {
        this.y += vy * this.dt
      }
    } else {
      if (this.y + vy >= this.targetY) {
        this.y = this.targetY
        this.hitY = true
      } else {
        this.y += vy * this.dt
      }
    }

    if (this.hitX && this.hitY) {
      const randExplosion = rand(0, 9)
      this.createParticles(this.targetX, this.targetY, this.hue)
      this.fireworks.splice(index, 1)
    }
  }
  createParticles(targetX: any, targetY: any, hue: any) {
    throw new Error('Method not implemented.')
  }

  draw() {
    this.ctx.lineWidth = this.lineWidth

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

    if (this.showTarget) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.arc(
        Math.round(this.targetX),
        Math.round(this.targetY),
        this.targetRadius,
        0,
        Math.PI * 2,
        false
      )
      this.ctx.closePath()
      this.ctx.lineWidth = 1
      this.ctx.stroke()
      this.ctx.restore()
    }

    if (this.showShockwave) {
      this.ctx.save()
      this.ctx.translate(Math.round(this.x), Math.round(this.y))
      this.ctx.rotate(this.shockwaveAngle)
      this.ctx.beginPath()
      this.ctx.arc(0, 0, 1 * (this.speed / 5), 0, Math.PI, true)
      this.ctx.strokeStyle =
        'hsla(' +
        this.hue +
        ', 100%, ' +
        this.brightness +
        '%, ' +
        rand(25, 60) / 100 +
        ')'
      this.ctx.lineWidth = this.lineWidth
      this.ctx.stroke()
      this.ctx.restore()
    }
  }
}
