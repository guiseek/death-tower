export class Vector2 {
  static get zero() {
    return new Vector2()
  }

  get isZero() {
    return this.x === 0 && this.y === 0
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  constructor(public x = 0, public y = 0) {}

  addTo(other: Vector2 | number) {
    if (other instanceof Vector2) {
      this.x += other.x
      this.y += other.y
    } else if (typeof other === 'number') {
      this.x += other
      this.y += other
    }
    return this
  }

  add(v: Vector2 | number) {
    const result = this.copy()
    return result.addTo(v)
  }

  subtractFrom(v: Vector2 | number) {
    if (v instanceof Vector2) {
      this.x -= v.x
      this.y -= v.y
    } else if (typeof v === 'number') {
      this.x -= v
      this.y -= v
    }
    return this
  }

  subtract(v: Vector2 | number) {
    var result = this.copy()
    return result.subtractFrom(v)
  }

  divideBy(v: Vector2 | number) {
    if (v instanceof Vector2) {
      this.x /= v.x
      this.y /= v.y
    } else if (typeof v === 'number') {
      this.x /= v
      this.y /= v
    }
    return this
  }

  divide(v: Vector2 | number) {
    var result = this.copy()
    return result.divideBy(v)
  }

  multiplyWith(v: Vector2 | number) {
    if (v instanceof Vector2) {
      this.x *= v.x
      this.y *= v.y
    } else if (typeof v === 'number') {
      this.x *= v
      this.y *= v
    }
    return this
  }

  multiply(v: Vector2 | number) {
    var result = this.copy()
    return result.multiplyWith(v)
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }

  normalize() {
    var length = this.length
    if (length === 0) return
    this.divideBy(length)
  }

  equals(obj: Vector2) {
    return this.x === obj.x && this.y === obj.y
  }

  distanceFrom(obj: Vector2) {
    return Math.sqrt(
      (this.x - obj.x) * (this.x - obj.x) + (this.y - obj.y) * (this.y - obj.y)
    )
  }

  copy() {
    return new Vector2(this.x, this.y)
  }
}
