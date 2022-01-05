export class Position {
  constructor(public x: number, public y: number) { }

  public dec = {
    x: (x: number) => {
      this.x -= x
      return this.x
    },
    y: (y: number) => {
      this.y -= y
      return this.y
    }
  }

  public inc = {
    x: (x: number) => {
      this.x += x
      return this.x
    },
    y: (y: number) => {
      this.y += y
      return this.y
    }
  }
}