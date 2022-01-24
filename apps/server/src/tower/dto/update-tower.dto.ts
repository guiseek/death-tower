import { PartialType } from '@nestjs/mapped-types';
import { CreateTowerDto } from './create-tower.dto';

export class UpdateTowerDto extends PartialType(CreateTowerDto) {
  id: number;
}
