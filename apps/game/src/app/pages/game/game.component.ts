import {
  OnInit,
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { PlatformService } from '../../shared/services/platform.service';
import { ConfigService } from '../../shared/services/config.service';
import { PointService } from '../../shared/services/point.service';
import { ControlActionEvent } from '../../shared/types/control';
import { ScoreState } from '../../+state/score.state';

import { OffScreen } from '../../shared/map/utilities/offscreen';
import { getLevel } from '../../shared/map/levels/get-level';
import { getRandomPoints } from '../../shared/map/utilities/math/get-random-points';
import { getPlatformsByPoints } from '../../shared/map/utilities/math/get-platforms-by-points';
import {
  loadCustomConfig,
  loadDefaultConfig,
  loadDomConfig,
} from '../../shared/map/map-config';
import { Door } from '../../shared/map/utilities/door';
import { CountdownState } from '../../+state/countdown.state';
import { Config } from '../../shared/types/config';
import {
  drawBricks,
  drawDoors,
  drawPlatforms,
  drawPlayer,
  drawShadows,
  drawSky,
  drawTitles,
} from '../../shared/map/utilities/draw';
import { checkDoor } from '../../shared/map/utilities/check';
import { keyDown } from '../../shared/map/utilities/key-down';
import { keyUp } from '../../shared/map/utilities/key-up';

const dir = '/assets/sounds';

const timeWavePassBy4 = new Audio(`${dir}/time/time-wave-pass-by-4.mp3`);
const timeWaveRipple2 = new Audio(`${dir}/time/time-wave-ripple-2.mp3`);
const clockTicking = new Audio(`${dir}/ambient/clock-ticking.mp3`);
const jumpSpringDown = new Audio(`${dir}/jump-spring-down.mp3`);
const jumpSpringUp = new Audio(`${dir}/jump-spring-up.mp3`);
const thunder = new Audio(`${dir}/thunder-rumble.mp3`);
const yeaah = new Audio(`${dir}/zumbi/yeaah.mp3`);
const running = new Audio(`${dir}/running.mp3`);
const scream = new Audio(`${dir}/scream.mp3`);

// const jumpSpringDown = new Audio('/assets/sounds/jump-spring-down.mp3');
// const jumpSpringUp = new Audio('/assets/sounds/jump-spring-up.mp3');
// const timeWaveRipple = new Audio('/assets/sounds/time-wave-ripple-2.mp3');
// const thunder = new Audio('/assets/sounds/thunder-rumble.mp3');
// const running = new Audio('/assets/sounds/running.mp3');
// const scream = new Audio('/assets/sounds/scream.mp3');
// const clock = new Audio('/assets/sounds/clock-ticking.mp3');





const fallback = new OffScreen(10, 10).canvas;

const hashLevel = location.hash.substring(1);

if (!hashLevel) {
  location.hash = 'training';
}

const level = getLevel(hashLevel);
const positions = getRandomPoints(level, level.y.max - 2);
const platforms = getPlatformsByPoints(positions);

const doors = [new Door(1600, 350)];
const lastPos = positions.pop();
if (lastPos) {
  doors.push(new Door(lastPos.x, lastPos.y - 250));
}

// const defaultConfig = loadDefaultConfig()
// const domConfig = loadDomConfig(container, canvas, fallbackCanvas)
// const customConfig = loadCustomConfig({ doors })

@Component({
  selector: 'dt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ScoreState,
      useFactory: () => {
        return new ScoreState();
      },
    },
    {
      provide: CountdownState,
      useFactory: () => {
        return new CountdownState();
      },
    },
    ConfigService,
    PointService,
    PlatformService,
  ],
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy = new Subject<void>();

  @ViewChild('container')
  container!: ElementRef<HTMLElement>;

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  player = this.formBuilder.group({
    timer: [0, Validators.min(0)],
    score: [0, Validators.min(0)],
  });

  get hasFullscreen() {
    return document.fullscreenEnabled;
  }

  get inFullscreen() {
    return document.fullscreenElement;
  }

  private _config!: Config;

  public set config(value) {
    this._config = value;
  }

  get config() {
    return this._config;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private platformService: PlatformService,
    private configService: ConfigService,
    private pointService: PointService,
    readonly countdownState: CountdownState,
    readonly scoreState: ScoreState
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ level }) => {
      if (level) this.pointService.setPoints(level);
    });

    this.countdownState.seconds$.subscribe((seconds) => {
      console.log('seconds: ', seconds);
    })
    this.countdownState.gameover$.subscribe((gameover) => {
      console.log('gameover: ', gameover)
    })

    this.countdownState.start(3)
  }

  ngAfterViewInit(): void {
    this.scoreState.score$.pipe(takeUntil(this.destroy)).subscribe((score) => {
      const control = this.player.get('score');
      if (control) control.setValue(score);
    });

    this.platformService.platforms$
      .pipe(takeUntil(this.destroy))
      .subscribe((platforms) => {
        if (platforms.length) {
          this.configService.setPlatforms(platforms);
          console.log(platforms);
        }
      });

    this.pointService.points$
      .pipe(takeUntil(this.destroy))
      .subscribe((points) => {
        if (points.length) {
          this.platformService.setPlatforms(points);
        }
      });

    const container = this.container.nativeElement;
    const canvas = this.canvas.nativeElement;

    this.config = Object.assign(
      loadDefaultConfig(),
      loadDomConfig(container, canvas, fallback),
      loadCustomConfig({ doors })
    );

    this.configService.loadAnimations(this.config);

    addEventListener('keydown', (e) => keyDown(this.config, e), false)
    addEventListener('keyup', (e) => keyUp(this.config, e), false)

    this.config.platforms.push(...platforms);

    this.drawCanvas();
  }

  drawCanvas() {
    const now = document.timeline.currentTime ?? 0;
    this.config.state.dt = now - (this.config.state.time || now);
    this.config.state.time = now;

    if (!this.config.state.paused) {
      this.doCalculations();
    }

    if (!this.config.state.lastPlatform) {
      this.config.state.lastPlatform = this.config.platforms[0];
      // dead = false
    }

    if (
      !this.config.state.paused &&
      this.config.state.titles.opacity !== 100 &&
      this.config.state.winner.opacity !== 100
    ) {
      drawSky(this.config);
      drawPlatforms(this.config, false);
      drawBricks(this.config);
      drawDoors(this.config);
      drawShadows(this.config);
      drawPlatforms(this.config, true);
      drawPlayer(this.config);
    }

    if (!this.config.state.paused && this.config.state.finished) {
      navigator.vibrate(500);
      // drawWinner(this.config)
      if (!clockTicking.paused) {
        clockTicking.pause();
      }
      this.countdownState.reset();
    }

    if (this.config.state.paused) {
      drawTitles(this.config);
      if (!clockTicking.paused) {
        clockTicking.pause();
      }
      // if (!dead) die(config)
    }

    requestAnimationFrame(() => this.drawCanvas());
  }

  doCalculations() {
    if (this.config.input.left) {
      this.config.state.player.speed += this.config.settings.acceleration;
    } else if (this.config.input.right) {
      this.config.state.player.speed -= this.config.settings.acceleration;
    } else if (this.config.state.player.speed !== 0) {
      this.config.state.player.speed *= this.config.state.jump.isJumping
        ? this.config.settings.jump.friction
        : this.config.settings.friction;
    }

    if (
      Math.abs(this.config.state.player.speed) > this.config.settings.maxSpeed
    ) {
      this.config.state.player.speed =
        this.config.state.player.speed > 0
          ? this.config.settings.maxSpeed
          : -1 * this.config.settings.maxSpeed;
    } else if (
      Math.abs(this.config.state.player.speed) < this.config.settings.minSpeed
    ) {
      // playerState.idle()
      // playerState.setSpeed(0)

      this.config.state.player.speed = 0;
    }

    if (this.config.state.player.speed !== 0) {
      if (!this.config.state.jump.isJumping) {
        // playerState.run()
      }

      const currentSpeed = this.config.state.jump.isJumping
        ? this.config.state.player.speed * 0.7
        : this.config.state.player.speed;

      // playerState.setSpeed(currentSpeed)

      this.config.state.pos.x +=
        this.config.state.player.speed < 0
          ? Math.ceil(currentSpeed * (this.config.state.dt as number))
          : Math.floor(currentSpeed * (this.config.state.dt as number));

      const dir = currentSpeed > 0 ? 0 : 1;

      // playerState.toTurn(dir)

      this.config.state.player.dir = dir;
    }

    if (!this.config.state.climbstarted && this.config.input.jump) {
      this.config.state.climbstarted = true;
    }

    if (this.config.input.jump || this.config.state.jump.isJumping) {
      if (this.config.state.jump.isGrounded) {
        // playerState.jumpUp()
        // playerState.idle()

        this.config.state.jump.isGrounded = false;
        this.config.state.jump.isJumping = true;
        this.config.state.jump.isBoosting = true;
        this.config.state.jump.speed = this.config.settings.jump.maxSpeed;
      }

      if (this.config.state.jump.isJumping) {
        const upwards = this.config.state.jump.speed > 0;
        const adjust =
          (this.config.state.dt as number) < 30
            ? 30 - (this.config.state.dt as number)
            : 0; // .·´¯`(>▂<)´¯`·.

        if (!upwards && this.config.state.jump.isBoosting) {
          this.config.state.jump.isBoosting = false;
        }

        this.config.state.player.prevY = this.config.state.player.y;
        this.config.state.player.y -=
          this.config.state.jump.speed * (this.config.state.dt as number);
        this.config.state.jump.speed -=
          (this.config.settings.jump.gravity[
            upwards
              ? this.config.state.jump.isBoosting
                ? 'boost'
                : 'normal'
              : 'down'
          ] -
            adjust * 0.00002) *
          (this.config.state.dt as number);
      }
    }

    if (this.config.state.jump.isBoosting && !this.config.input.jump) {
      this.config.state.jump.isBoosting = false;
    }

    if (this.config.state.climbstarted && this.config.state.pos.y < 1440) {
      this.config.state.pos.y +=
        (this.config.state.player.y + this.config.state.pos.y < 250
          ? this.config.state.climbspeed.fast
          : this.config.state.climbspeed.normal) *
        (this.config.state.dt as number);
    }

    // collisionDetection()

    if (this.config.state.player.y + this.config.state.pos.y > 900) {
      // playerState.pause()
      // playerState.idle()

      this.config.state.paused = true;
    }

    if (
      this.config.state.lastPlatform &&
      this.config.state.lastPlatform.n === platforms.length - 1
    ) {
      this.config.state.finished = true;
    }
  }

  collisionDetection() {
    if (this.config.state.jump.isJumping && this.config.state.jump.speed < 0) {
      for (let i = 0; i < this.config.state.activePlatforms.length; i++) {
        const platform = this.config.state.activePlatforms[i];

        if (Math.abs(platform.x - (this.config.state.pos.x + 90)) < 10) {
          const playerFloor = this.config.state.player.y + 250;
          const playerFloorPrev = this.config.state.player.prevY + 250;

          if (playerFloor > platform.y && playerFloorPrev < platform.y) {
            // playerState.setPlatform(platform.n)
            // playerState.jumpDown()
            // playerState.idle()

            navigator.vibrate(50);

            // checkPoint(this.config.state, platform)

            // pointsElement.value = (this.config.state.points | 0).toString()

            this.config.state.player.y = platform.y - 250;
            this.config.state.jump.isGrounded = true;
            this.config.state.jump.isJumping = false;
            this.config.state.jump.isBoosting = false;
            this.config.state.jump.speed = 0;
          }
        }
      }
    } else if (this.config.state.jump.isGrounded) {
      let groundToStandOnFound = false;

      for (let i = 0; i < this.config.state.activePlatforms.length; i++) {
        const platform = this.config.state.activePlatforms[i];

        if (Math.abs(platform.x - (this.config.state.pos.x + 90)) < 10) {
          if (platform.y - (this.config.state.player.y + 250) === 0) {
            groundToStandOnFound = true;

            break;
          }
        }
      }

      if (!groundToStandOnFound) {
        // playerState.jumpUp()

        this.config.state.jump.isGrounded = false;
        this.config.state.jump.isJumping = true;
        this.config.state.jump.isBoosting = true;
        this.config.state.jump.speed = this.config.settings.jump.fallStartSpeed;
      }
    } else {
      this.config.doors.forEach((door) => checkDoor(this.config, door));
    }
  }

  onTouch({ action }: ControlActionEvent): void {
    this.configService.updateInput({ [action]: true });
    this.scoreState.increment(10);
  }

  toggleFullscreen() {
    if (!this.inFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
