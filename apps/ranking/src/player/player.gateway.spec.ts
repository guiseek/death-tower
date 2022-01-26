import { Test, TestingModule } from '@nestjs/testing';
import { PlayerGateway } from './player.gateway';
import { PlayerService } from './player.service';

describe('PlayerGateway', () => {
  let gateway: PlayerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerGateway, PlayerService],
    }).compile();

    gateway = module.get<PlayerGateway>(PlayerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
