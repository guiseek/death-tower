import { Firework } from './firework'
import { Particle } from './particle'
import { rand } from './rand'

export class Fireworks {
  x: any
  y: any
  startX: any
  startY: any
  hitX: boolean
  hitY: boolean
  coordLast: { x: any; y: any }[]
  targetX: any
  targetY: any
  speed: any
  fworkSpeed: any
  angle: number
  shockwaveAngle: number
  acceleration: number
  fworkAccel = 0
  hue: any
  currentHue: any
  brightness: number
  alpha: number
  lineWidth: any
  targetRadius: number
  dt = 0
  oldTime = 0
  canvas!: HTMLCanvasElement
  canvasContainer: any
  cw = 0
  ch = 0
  particles: Particle[] = []
  partCount = 0
  fireworks: Firework[] = []
  mx = 0
  my = 0
  partSpeed = 0
  partSpeedVariance = 0
  partWind = 0
  partFriction = 0
  partGravity = 0
  hueMin = 0
  hueMax = 0
  hueVariance = 0
  flickerDensity = 0
  showShockwave = true
  showTarget = true
  clearAlpha = 0
  ctx: any

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

  init() {
    this.dt = 0
    this.oldTime = Date.now()
    this.canvas = document.createElement('canvas')
    this.canvasContainer = document.querySelector('#container')

    const canvasContainerDisabled = document.getElementById('container')
    this.canvas.onselectstart = function () {
      return false
    }

    this.canvas.width = this.cw = 600
    this.canvas.height = this.ch = 400

    this.particles = []
    this.partCount = 30
    this.fireworks = []
    this.mx = this.cw / 2
    this.my = this.ch / 2
    this.currentHue = 170
    this.partSpeed = 5
    this.partSpeedVariance = 10
    this.partWind = 50
    this.partFriction = 5
    this.partGravity = 1
    this.hueMin = 150
    this.hueMax = 200
    this.fworkSpeed = 2
    this.fworkAccel = 4
    this.hueVariance = 30
    this.flickerDensity = 20
    this.showShockwave = false
    this.showTarget = true
    this.clearAlpha = 25

    this.canvasContainer.append(this.canvas)
    this.ctx = this.canvas.getContext('2d')
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.lineWidth = 1
    this.bindEvents()
    this.canvasLoop()

    this.canvas.onselectstart = function () {
      return false
    }
  }
  bindEvents() {
    throw new Error('Method not implemented.')
  }
  canvasLoop() {
    throw new Error('Method not implemented.')
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

  static createFireworks(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number
  ) {
    this.fireworks.push(new Firework(startX, startY, targetX, targetY))
  }

  updateFireworks() {
    let i = this.fireworks.length
    while (i--) {
      const f = this.fireworks[i]
      f.update(i)
    }
  }

  drawFireworks() {
    let i = this.fireworks.length
    while (i--) {
      const f = this.fireworks[i]
      f.draw()
    }
  }

  createParticles(x: number, y: number, hue: number) {
    let countdown = this.partCount
    while (countdown--) {
      this.particles.push(new Particle(x, y, hue))
    }
  }

  updateParticles() {
    let i = this.particles.length
    while (i--) {
      const p = this.particles[i]
      p.update(i)
    }
  }

  drawParticles() {
    let i = this.particles.length
    while (i--) {
      const p = this.particles[i]
      p.draw()
    }
  }
}
