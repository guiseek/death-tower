import { Module } from '@nestjs/common';
import { TowerService } from './tower.service';
import { TowerGateway } from './tower.gateway';

@Module({
  providers: [TowerGateway, TowerService],
})
export class TowerModule {}
