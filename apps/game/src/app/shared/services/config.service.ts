import { Inject, Injectable } from '@angular/core';

import { ANIMATION_FRAMES_TOKEN } from '../../config/animation-frames';
import { AnimationFrames, Config, InputConfig } from '../types/config';
import { loadAnimationFrame } from '../map/utilities/load';
import { Platform } from '../map/utilities/platform';
import { PlayerAction } from '../types/player';
import { StateService } from './state.service';
import { Door } from '../map/utilities/door';
import {
  loadDomConfig,
  loadDefaultConfig,
  loadCustomConfig,
} from '../map/map-config';

type ConfigState = Config;

const initialState: Config = {
  ...loadDefaultConfig(),
  ...loadDomConfig(),
  ...loadCustomConfig({
    doors: [new Door(1600, 350)],
  }),
};

@Injectable()
export class ConfigService extends StateService<ConfigState> {
  config$ = this.select((state) => state);

  state$ = this.select((state) => state.state);

  input$ = this.select((state) => state.input);

  constructor(
    @Inject(ANIMATION_FRAMES_TOKEN)
    readonly animationFrames: AnimationFrames
  ) {
    super(initialState);
  }

  loadAnimations() {
    const animationFrames = {
      standing: this.loadAnimationFrames('standing'),
      jumpingUp: this.loadAnimationFrames('jumpingUp'),
      jumpingDown: this.loadAnimationFrames('jumpingDown'),
      runningLeft: this.loadAnimationFrames('runningLeft'),
      runningRight: this.loadAnimationFrames('runningRight'),
    };

    this.setState({ animationFrames });
  }

  setCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    this.setState({ canvas, ctx });
  }

  loadAnimationFrames(action: PlayerAction) {
    return this.animationFrames[action].map((frame) => {
      return loadAnimationFrame(frame.src, frame.flipped);
    });
  }

  updatePlatforms(platforms: Platform[]) {
    const config = this.state;
    config.platforms = platforms;
    this.setState(config);

    const lastPlatform = platforms.pop();
    if (lastPlatform) {
      const { x, y } = lastPlatform;
      config.doors.push(new Door(x, y));
      this.setState(config);
    }
  }

  updateInput(value: Partial<InputConfig>) {
    this.setState({ input: { ...this.state.input, ...value } });
  }
}
