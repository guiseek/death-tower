import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutModule } from '@angular/cdk/layout';

import {
  GameState,
  PlayerState,
  LevelDataRepository,
} from '@death-tower/stage/data-access';
import { LevelRepository } from '@death-tower/stage/domain';
import { StageUiMapModule } from '@death-tower/stage/ui-map';
import {
  SOUND_CONFIG,
  CUSTOM_CONFIG,
  DEFAULT_CONFIG,
  PLAYER_FRAMES_CONFIG,
} from '../../stage-tower.config';

import { TowerComponent } from './tower.component';

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn()
});

const SOUND_CONFIG_VALUE = {
  jumpingDown: new Audio(``),
  jumpingUp: new Audio(``),
  thunder: new Audio(``),
  yeaah: new Audio(``),
  scream: new Audio(``),
};

const standing = '';
const jumping = '';
const jumpingdown = '';
const running = '';
const walking = '';

const FRAMES_CONFIG_VALUE = [
  [standing, 'standing', 0, false],
  [standing, 'standing', 1, true],
  [jumping, 'jumpingUp', 0, false],
  [jumping, 'jumpingUp', 1, true],
  [jumpingdown, 'jumpingDown', 0, false],
  [jumpingdown, 'jumpingDown', 1, true],

  [running, 'runningLeft', 0, false],
  [running, 'runningLeft', 1, false],
  [running, 'runningRight', 0, true],
  [running, 'runningRight', 1, true],

  [walking, 'runningRight', 2, true],
  [walking, 'runningLeft', 2, false],
  [walking, 'runningLeft', 3, false],
  [walking, 'runningRight', 3, true],
];

export const DEFAULT_CONFIG_VALUE = {
  brick: {
    shine: '',
    shade: 'rgba(200, 200, 200, 0.8)',
    color: '#64696C',
    width: 16,
    height: 48,
    padding: 4,
  },
  platform: { height: 22, /* Degrees */ width: 13, color: '#5A4142' },
  tower: { width: 1200, shadowWidth: 100, skyWidth: 200 },
  sky: {
    bg: 'rgb(10, 21, 32)',
    starSizes: [3, 1, 2, 2],
    starColors: ['#f1f1f1', '#FFDCD4', '#7AEFFF', '#FFF385'],
  },
  colors: {
    bg: '#6A503E',
    wood1: '#6A503E',
    wood2: '#80604A',
    wood3: '#4B3937',
    wood4: '#6A503E',
    wood5: '#B46736',
  },
  storage: { bricks: null, sky: null, shadows: null },
  input: { left: false, right: false, jump: false, fullscreen: false },
};

export const CUSTOM_CONFIG_VALUE = {
  platforms: [],
  doors: [],
  savedState: null,
  settings: {
    maxSpeed: 0.09,
    minSpeed: 0.01,
    friction: 0.7,
    acceleration: 0.02,
    jump: {
      gravity: { boost: 0.0014, normal: 0.003, down: 0.004 },
      maxSpeed: 0.6,
      fallStartSpeed: 0.07,
      friction: 0.98,
    },
  },
  state: {
    paused: false,
    touched: false,
    finished: false,
    score: 0,
    lastPlatform: null,
    platformReached: null,
    titles: { opacity: 0, ready: false, text: 'Não foi desta vez' },
    winner: { opacity: 0, ready: false, text: 'Você conseguiu!!!' },
    climbstarted: false,
    time: null,
    dt: null,
    climbspeed: { normal: 0.05, fast: 0.12 },
    pos: { x: 1510, y: 0 },
    lastPos: { x: 1510, y: 0 },
    activePlatforms: [],
    jump: {
      isGrounded: true,
      isJumping: false,
      isBoosting: false,
      speed: 0,
      nextY: 0,
    },
    player: {
      dir: 1,
      x: 725,
      y: 350,
      prevY: 350,
      speed: 0,
      animationFrame: 0,
      animationFrameCount: 0,
    },
  },
};

describe('TowerComponent', () => {
  let component: TowerComponent;
  let fixture: ComponentFixture<TowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        StageUiMapModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [TowerComponent],
      providers: [
        {
          provide: LevelRepository,
          useClass: LevelDataRepository,
        },
        {
          provide: PlayerState,
          useClass: PlayerState,
        },
        {
          provide: GameState,
          useFactory: (repo: LevelRepository) => {
            return new GameState(repo);
          },
          deps: [LevelRepository],
        },
        {
          provide: SOUND_CONFIG,
          useValue: SOUND_CONFIG_VALUE,
        },
        {
          provide: DEFAULT_CONFIG,
          useValue: DEFAULT_CONFIG_VALUE,
        },
        {
          provide: CUSTOM_CONFIG,
          useValue: CUSTOM_CONFIG_VALUE,
        },
        {
          provide: PLAYER_FRAMES_CONFIG,
          useValue: FRAMES_CONFIG_VALUE,
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
