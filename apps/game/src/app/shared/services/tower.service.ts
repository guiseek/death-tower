import { Socket } from "socket.io-client"
import { Coord } from "@death-tower/core/interfaces"

type TowerEvent = 'createTower' | 'findAllTower' | 'findOneTower' | 'updateTower' | 'removeTower'
type TowerResponse = {
  'createTower': [number, Coord[]]
  'findOneTower': [number, Coord[]]
  'findAllTower': [[number, Coord[]]]
  'updateTower': [number, Coord[]]
  'removeTower': void
}

export class TowerService {

  constructor(private socket: Socket) { }

  on<R extends TowerEvent>(event: R) {
    this.socket.emit(event)
    return {
      do: (cb: (value: TowerResponse[R]) => void) => {
        this.socket.on(event, cb as any)
      }
    }
  }
}
