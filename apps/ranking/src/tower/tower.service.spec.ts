import { Test, TestingModule } from '@nestjs/testing';
import { TowerService } from './tower.service';

describe('TowerService', () => {
  let service: TowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TowerService],
    }).compile();

    service = module.get<TowerService>(TowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
