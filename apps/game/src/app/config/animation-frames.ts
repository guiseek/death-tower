import { AnimationFrames } from '../shared/types/config';
import { InjectionToken } from '@angular/core';

export const ANIMATION_FRAMES_TOKEN = new InjectionToken<
  AnimationFrames
>('animationFrames');


export const ANIMATION_FRAMES_VALUE: AnimationFrames = {
  standing: [
    {
      src: 'assets/player/zumbi/state=standing.png',
      type: 'standing',
      index: 0,
      flipped: false,
    },
    {
      src: 'assets/player/zumbi/state=standing.png',
      type: 'standing',
      index: 1,
      flipped: true,
    },
  ],
  jumpingUp: [
    {
      src: 'assets/player/zumbi/state=jumping.png',
      type: 'jumpingUp',
      index: 0,
      flipped: false,
    },
    {
      src: 'assets/player/zumbi/state=jumping.png',
      type: 'jumpingUp',
      index: 1,
      flipped: true,
    },
  ],
  jumpingDown: [
    {
      src: 'assets/player/zumbi/state=jumpingdown.png',
      type: 'jumpingDown',
      index: 0,
      flipped: false,
    },
    {
      src: 'assets/player/zumbi/state=jumpingdown.png',
      type: 'jumpingDown',
      index: 1,
      flipped: true,
    },
  ],
  runningLeft: [
    {
      src: 'assets/player/zumbi/state=running.png',
      type: 'runningLeft',
      index: 0,
      flipped: false,
    },
    {
      src: 'assets/player/zumbi/state=running.png',
      type: 'runningLeft',
      index: 1,
      flipped: false,
    },
    {
      src: 'assets/player/zumbi/state=walking.png',
      type: 'runningLeft',
      index: 2,
      flipped: false,
    },
    {
      src: 'assets/player/zumbi/state=walking.png',
      type: 'runningLeft',
      index: 3,
      flipped: false,
    },
  ],
  runningRight: [
    {
      src: 'assets/player/zumbi/state=running.png',
      type: 'runningRight',
      index: 0,
      flipped: true,
    },
    {
      src: 'assets/player/zumbi/state=running.png',
      type: 'runningRight',
      index: 1,
      flipped: true,
    },

    {
      src: 'assets/player/zumbi/state=walking.png',
      type: 'runningRight',
      index: 2,
      flipped: true,
    },
    {
      src: 'assets/player/zumbi/state=walking.png',
      type: 'runningRight',
      index: 3,
      flipped: true,
    },
  ]
}

// export const ANIMATION_FRAMES_CONFIG_VALUE: AnimationFrames = [
//   {
//     src: 'assets/player/zumbi/state=standing.png',
//     type: 'standing',
//     index: 0,
//     flipped: false,
//   },
//   {
//     src: 'assets/player/zumbi/state=standing.png',
//     type: 'standing',
//     index: 1,
//     flipped: true,
//   },

//   {
//     src: 'assets/player/zumbi/state=jumping.png',
//     type: 'jumpingUp',
//     index: 0,
//     flipped: false,
//   },
//   {
//     src: 'assets/player/zumbi/state=jumping.png',
//     type: 'jumpingUp',
//     index: 1,
//     flipped: true,
//   },

//   {
//     src: 'assets/player/zumbi/state=jumpingdown.png',
//     type: 'jumpingDown',
//     index: 0,
//     flipped: false,
//   },
//   {
//     src: 'assets/player/zumbi/state=jumpingdown.png',
//     type: 'jumpingDown',
//     index: 1,
//     flipped: true,
//   },

//   {
//     src: 'assets/player/zumbi/state=running.png',
//     type: 'runningLeft',
//     index: 0,
//     flipped: false,
//   },
//   {
//     src: 'assets/player/zumbi/state=running.png',
//     type: 'runningLeft',
//     index: 1,
//     flipped: false,
//   },
//   {
//     src: 'assets/player/zumbi/state=running.png',
//     type: 'runningRight',
//     index: 0,
//     flipped: true,
//   },
//   {
//     src: 'assets/player/zumbi/state=running.png',
//     type: 'runningRight',
//     index: 1,
//     flipped: true,
//   },

//   {
//     src: 'assets/player/zumbi/state=walking.png',
//     type: 'runningRight',
//     index: 2,
//     flipped: true,
//   },
//   {
//     src: 'assets/player/zumbi/state=walking.png',
//     type: 'runningLeft',
//     index: 2,
//     flipped: false,
//   },
//   {
//     src: 'assets/player/zumbi/state=walking.png',
//     type: 'runningLeft',
//     index: 3,
//     flipped: false,
//   },
//   {
//     src: 'assets/player/zumbi/state=walking.png',
//     type: 'runningRight',
//     index: 3,
//     flipped: true,
//   },
// ];
