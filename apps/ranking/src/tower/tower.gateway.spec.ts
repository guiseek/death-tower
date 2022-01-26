import { Test, TestingModule } from '@nestjs/testing';
import { TowerGateway } from './tower.gateway';
import { TowerService } from './tower.service';

describe('TowerGateway', () => {
  let gateway: TowerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TowerGateway, TowerService],
    }).compile();

    gateway = module.get<TowerGateway>(TowerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
