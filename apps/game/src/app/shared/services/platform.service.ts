import { Platform } from './../map/utilities/platform';
import { StateService } from './state.service';
import { Injectable } from '@angular/core';
import { Point } from '../types/config';

interface PlatformState {
  platforms: Platform[];
}

const initialState: PlatformState = {
  platforms: [],
}

@Injectable()
export class PlatformService extends StateService<PlatformState> {
  public platforms$ = this.select((state) => state.platforms);

  constructor() {
    super(initialState);
  }

  setPlatforms(points: Point[]) {
    const mapper = ({ x, y }: Point) => new Platform(x, y);

    this.setState({ platforms: points.map(mapper) });
  }
}
