import { PlayerModule } from './player/player.module';
import { TowerModule } from './tower/tower.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TowerModule, PlayerModule],
})
export class AppModule {}
