import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { TowerService } from './tower.service';
import { CreateTowerDto } from './dto/create-tower.dto';
import { UpdateTowerDto } from './dto/update-tower.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TowerGateway {
  constructor(private readonly towerService: TowerService) {}

  @SubscribeMessage('createTower')
  create(@MessageBody() createTowerDto: CreateTowerDto) {
    return this.towerService.create(createTowerDto);
  }

  @SubscribeMessage('findAllTower')
  findAll() {
    return this.towerService.findAll();
  }

  @SubscribeMessage('findOneTower')
  findOne(@MessageBody() id: number) {
    return this.towerService.findOne(id);
  }

  @SubscribeMessage('updateTower')
  update(@MessageBody() updateTowerDto: UpdateTowerDto) {
    return this.towerService.update(updateTowerDto.id, updateTowerDto);
  }

  @SubscribeMessage('removeTower')
  remove(@MessageBody() id: number) {
    return this.towerService.remove(id);
  }
}
