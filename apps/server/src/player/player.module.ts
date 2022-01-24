import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerGateway } from './player.gateway';

@Module({
  providers: [PlayerGateway, PlayerService],
})
export class PlayerModule {}
