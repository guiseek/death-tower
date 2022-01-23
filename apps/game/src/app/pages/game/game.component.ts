import { Platform as CdkPlatform } from '@angular/cdk/platform';
import { MediaMatcher } from '@angular/cdk/layout';
import { filter, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  OnInit,
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  Config,
  Platform,
  ControlActionEvent,
} from '@death-tower/core/interfaces';

import {
  loadCustomConfig,
  loadDefaultConfig,
  loadDomConfig,
} from '@death-tower/core/util-config';

import {
  Door,
  drawSky,
  drawDoors,
  OffScreen,
  drawBricks,
  drawPlayer,
  drawTitles,
  drawShadows,
  drawPlatforms,
  drawWinner,
} from '@death-tower/core/util-map';

import { loadImages } from '../../config/animation-frames';
import { GameState, PlayerState } from '../../+state';

const dir = '/assets/sounds';

const clockTicking = new Audio(`${dir}/ambient/clock-ticking.mp3`);
const jumpingDown = new Audio(`${dir}/jump-spring-down.mp3`);
const jumpingUp = new Audio(`${dir}/jump-spring-up.mp3`);
const thunder = new Audio(`${dir}/thunder-rumble.mp3`);
const yeaah = new Audio(`${dir}/zumbi/yeaah.mp3`);
const running = new Audio(`${dir}/running.mp3`);
const scream = new Audio(`${dir}/scream.mp3`);

@Component({
  selector: 'dt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: GameState,
      useFactory: () => {
        return new GameState();
      },
    },
    {
      provide: PlayerState,
      useFactory: () => {
        return new PlayerState();
      },
    },
  ],
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy = new Subject<void>();

  @ViewChild('container')
  container!: ElementRef<HTMLElement>;

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  get hasFullscreen() {
    return document.fullscreenEnabled;
  }

  get inFullscreen() {
    return document.fullscreenElement;
  }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  private _config!: Config;

  public set config(value) {
    this._config = value;
  }

  get config() {
    return this._config;
  }

  touched = false;

  constructor(
    media: MediaMatcher,
    cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private cdkPlatform: CdkPlatform,

    readonly player: PlayerState,
    private readonly game: GameState
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        filter((level) => !!level),
        takeUntil(this.destroy)
      )
      .subscribe(({ level }) => {
        this.game.loadLevel(level);
      });

    this.player.gameover$
      .pipe(takeUntil(this.destroy))
      .subscribe((gameover) => {
        console.log('gameover: ', gameover);
      });
  }

  ngAfterViewInit(): void {
    const container = this.container.nativeElement;
    const game = this.canvas.nativeElement;

    const doors = [new Door(1600, 350)];
    const { canvas } = new OffScreen(10, 10);

    this.config = Object.assign(
      loadDefaultConfig(),
      loadDomConfig(container, game, canvas),
      loadCustomConfig({ doors })
    );

    /**
     * Reinicia o jogo e coloca o player
     * novamente na primeira plataforma
     */
    if (!this.config.savedState) {
      this.config.savedState = JSON.parse(JSON.stringify(this.config.state));
    }

    /**
     * Carrega as imagens como frames
     * sequenciais com estados do player
     */
    loadImages(this.config);

    /**
     * Atualiza plataformas na torre
     */
    this.game.platforms$
      .pipe(takeUntil(this.destroy))
      .subscribe((platforms) => {
        if (this.config && platforms.length) {
          if (!this.config.platforms.length) {
            this.config.platforms = platforms;

            this.config.state.lastPlatform = platforms[0];

            /**
             * Como ainda não haviam plataformas
             * inicializa processo de renderização
             */
            this.drawCanvas();
          } else {
            this.config.platforms = platforms;
          }
        }
      });

    addEventListener('keyup', this.onKeyUp, false);
    addEventListener('keydown', this.onKeyDown, false);
    addEventListener('keypress', this.onKeyPress, false);
  }

  onKeyUp = (e: KeyboardEvent) => this.move(e, false);
  onKeyDown = (e: KeyboardEvent) => this.move(e, true);
  onKeyPress = () => {
    if (!this.touched) {
      this.player.start();
      this.touched = true;
      thunder.play();
    }
  };

  move(e: KeyboardEvent, keyDown: boolean) {
    if (e.key === 'ArrowLeft') this.config.input.left = keyDown;
    if (e.key === 'ArrowRight') this.config.input.right = keyDown;
    if (e.key === ' ') this.config.input.jump = keyDown;
  }

  onTouch({ action, time }: ControlActionEvent): void {
    this.config.input[action] = time === 'press';
  }

  toggleFullscreen() {
    if (!this.inFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
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
      this.player.reset();
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
      drawWinner(this.config);
    }

    if (this.config.state.paused) {
      drawTitles(this.config);
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
      this.config.state.player.speed = 0;
    }

    if (this.config.state.player.speed !== 0) {
      const currentSpeed = this.config.state.jump.isJumping
        ? this.config.state.player.speed * 0.7
        : this.config.state.player.speed;

      this.config.state.pos.x +=
        this.config.state.player.speed < 0
          ? Math.ceil(currentSpeed * (this.config.state.dt as number))
          : Math.floor(currentSpeed * (this.config.state.dt as number));

      const dir = currentSpeed > 0 ? 0 : 1;

      this.config.state.player.dir = dir;
    }

    if (!this.config.state.climbstarted && this.config.input.jump) {
      this.config.state.climbstarted = true;
    }

    if (this.config.input.jump || this.config.state.jump.isJumping) {
      if (this.config.state.jump.isGrounded) {
        if (jumpingUp.paused) {
          jumpingUp.play();
        }
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

    this.collisionDetection();

    if (this.landedOut()) {
      this.config.state.paused = true;
    }

    if (this.isTheLastPlatform()) {
      this.config.state.finished = true;
    }
  }

  landedOut() {
    return this.config.state.player.y + this.config.state.pos.y > 900;
  }

  isTheLastPlatform() {
    return (
      this.config.state.lastPlatform &&
      this.config.state.lastPlatform.n === this.config.platforms.length - 1
    );
  }

  collisionDetection() {
    if (this.config.state.jump.isJumping && this.config.state.jump.speed < 0) {
      for (let i = 0; i < this.config.state.activePlatforms.length; i++) {
        const platform = this.config.state.activePlatforms[i];

        if (Math.abs(platform.x - (this.config.state.pos.x + 90)) < 10) {
          const playerFloor = this.config.state.player.y + 250;
          const playerFloorPrev = this.config.state.player.prevY + 250;

          if (playerFloor > platform.y && playerFloorPrev < platform.y) {
            if (this.touched) {
              jumpingDown.play();
            }

            if (this.cdkPlatform.ANDROID || this.cdkPlatform.IOS) {
              navigator.vibrate(50);
            }

            this.checkPoint(platform);

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
        if (jumpingUp.paused) {
          jumpingUp.play();
        }
        this.config.state.jump.isGrounded = false;
        this.config.state.jump.isJumping = true;
        this.config.state.jump.isBoosting = true;
        this.config.state.jump.speed = this.config.settings.jump.fallStartSpeed;
      }
    }
  }

  checkPoint(platform: Platform) {
    if (
      this.config.state.lastPlatform &&
      platform.n > this.config.state.lastPlatform.n
    ) {
      this.config.state.lastPlatform = platform;
      this.updateScore(platform);
    }
  }

  updateScore(platform: Platform) {
    const speed = this.config.state.player.speed * -1 * 1000;
    const score = parseInt(`${platform.n * speed}`, 10);

    this.config.state.points = score;
    this.player.patchValue({ score });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
