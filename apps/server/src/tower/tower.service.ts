import { Injectable } from '@nestjs/common';
import { Coord } from '@death-tower/core/interfaces';
import { CreateTowerDto } from './dto/create-tower.dto';
import { UpdateTowerDto } from './dto/update-tower.dto';

@Injectable()
export class TowerService {
  private _towers = new Map<number, Coord[]>();
  create(value: CreateTowerDto) {
    return this._towers.set(value.id, value.coords);
  }

  findAll() {
    return Array.from(this._towers.entries());
  }

  findOne(id: number) {
    return this._towers.get(id);
  }

  update(id: number, value: UpdateTowerDto) {
    return this._towers.set(id, value.coords);
  }

  remove(id: number) {
    return this._towers.delete(id);
  }
}
