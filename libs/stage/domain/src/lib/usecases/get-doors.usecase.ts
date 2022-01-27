import { Door, Platform } from '@death-tower/core/util-map';
import { UseCase } from './usecase';

export class GetDoorsUseCase implements UseCase<Platform, Door[]> {
  execute({ x, y }: Platform): Door[] {
    return [new Door(), new Door(x, y - 250)];
  }
}
