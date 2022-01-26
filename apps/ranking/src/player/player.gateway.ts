import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@WebSocketGateway()
export class PlayerGateway {
  constructor(private readonly playerService: PlayerService) {}

  @SubscribeMessage('createPlayer')
  create(@MessageBody() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @SubscribeMessage('findAllPlayer')
  findAll() {
    return this.playerService.findAll();
  }

  @SubscribeMessage('findOnePlayer')
  findOne(@MessageBody() id: number) {
    return this.playerService.findOne(id);
  }

  @SubscribeMessage('updatePlayer')
  update(@MessageBody() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(updatePlayerDto.id, updatePlayerDto);
  }

  @SubscribeMessage('removePlayer')
  remove(@MessageBody() id: number) {
    return this.playerService.remove(id);
  }
}
