import { filter, fromEvent, repeat, Subject, takeUntil, timer } from 'rxjs';
import { Platform as CdkPlatform } from '@angular/cdk/platform';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {
  OnInit,
  Inject,
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  Config,
  Platform,
  SoundConfig,
  PlayerFrames,
  DOMConfig,
  DefaultConfig,
  CustomConfig,
  ControlActionEvent,
} from '@death-tower/core/interfaces';
import {
  Door,
  parsify,
  drawSky,
  drawText,
  drawDoors,
  OffScreen,
  loadPlayer,
  drawBricks,
  drawPlayer,
  drawShadows,
  drawPlatforms,
  drawScore,
} from '@death-tower/core/util-map';

import { GameState, PlayerState } from '@death-tower/stage/data-access';

import {
  SOUND_CONFIG,
  DEFAULT_CONFIG,
  CUSTOM_CONFIG,
  PLAYER_FRAMES_CONFIG,
} from '../../stage-tower.config';
import { coreGamepad } from '@death-tower/core/gamepad';

@Component({
  selector: 'death-tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TowerComponent implements OnInit, AfterViewInit, OnDestroy {
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

  timer = 0;
  seconds = 0;
  level = '';
  code: number | null = null;
  radio: {
    last: HTMLAudioElement | null;
    current: HTMLAudioElement | null;
  } = {
    last: null,
    current: null,
  };

  readonly hideElement$;

  lastUp = Date.now();

  gamepad = 0;

  constructor(
    media: MediaMatcher,
    cdr: ChangeDetectorRef,
    private title: Title,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cdkPlatform: CdkPlatform,

    readonly game: GameState,
    readonly player: PlayerState,

    // @Inject(RADIO_CONFIG)
    // readonly radioConfig: RadioConfig,

    @Inject(SOUND_CONFIG)
    readonly soundConfig: SoundConfig,

    @Inject(DEFAULT_CONFIG)
    readonly defaultConfig: DefaultConfig,

    @Inject(CUSTOM_CONFIG)
    readonly customConfig: CustomConfig,

    @Inject(PLAYER_FRAMES_CONFIG)
    readonly playerFrames: PlayerFrames
  ) {
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery = media.matchMedia(
      '(max-width: 1024px) and (orientation: landscape)'
    );
    this.mobileQuery.addListener(this._mobileQueryListener);

    const idleTime$ = timer(0, 5000);
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.hideElement$ = idleTime$.pipe(takeUntil(mouseMove$), repeat());

    if ('getGamepads' in navigator) {
      this.gamepad = coreGamepad((gamepad) => {
        gamepad.buttons.forEach((button, index) => {
          if (button.pressed && !this.config.state.touched) {
            this.config.state.touched = true;

            this.game.start();

            if (!this.player.muted) {
              this.soundConfig.thunder.play();
            }
          }

          if (index === 4) this.config.input.left = button.pressed;
          if (index === 5) this.config.input.right = button.pressed;
          if (index === 2) this.config.input.jump = button.pressed;
        });
      });

      window.ongamepaddisconnected = () => {
        cancelAnimationFrame(this.gamepad);
      };
    }
  }

  onRouting({ params, queryParams }: ActivatedRouteSnapshot) {
    const { level } = params;
    const { coords } = queryParams;

    this.level = level;

    this.game.loadLevel(level, coords);
  }

  ngOnInit(): void {
    this.onRouting(this.route.snapshot);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.onRouting(this.route.snapshot));

    this.game.code$
      .pipe(takeUntil(this.destroy))
      .subscribe((code) => (this.code = code));

    this.game.seconds$
      .pipe(takeUntil(this.destroy))
      .subscribe((seconds) => (this.seconds = seconds));

    this.game.timer$
      .pipe(takeUntil(this.destroy))
      .subscribe((timer) => (this.timer = timer));

    this.player.finished$
      .pipe(takeUntil(this.destroy))
      .subscribe((finished) => {
        if (finished) {
          if (this.level === 'training') {
            const $timer = timer(2000).subscribe(() => {
              this.router.navigate(['/easy']);
              $timer.unsubscribe();
            });
          }
        }
      });

    this.player.listen(this.soundConfig, this.destroy);
  }

  ngAfterViewInit(): void {
    this.loadMap();

    this.game.level$.pipe(takeUntil(this.destroy)).subscribe((level) => {
      if (this.config.settings && level) {
        this.title.setTitle(`${level.name} - Death Tower`);

        this.config.settings.minSpeed = level.speed.min;
        this.config.settings.maxSpeed = level.speed.max;
        this.config.settings.jump.maxSpeed = level.jump;
        this.config.settings.acceleration = level.acceleration;
      }
    });

    /* Atualiza plataformas na torre */
    this.game.platforms$
      .pipe(takeUntil(this.destroy))
      .subscribe((platforms) => {
        if (this.config && platforms.length) {
          if (!this.config.platforms.length) {
            this.config.state.lastPlatform = platforms[0];

            /** Como ainda não haviam plataformas
             * inicializa processo de renderização */
            this.drawCanvas();
          }

          this.config.platforms = platforms;

          const lastIndex = platforms.length - 1;
          const lastPlatform = platforms[lastIndex];
          if (lastPlatform) this.addDoors(lastPlatform);
        }
      });
  }

  loadMap() {
    const container = this.container.nativeElement;
    const game = this.canvas.nativeElement;

    this.config = this.loadConfig(container, game);

    /** Reinicia o jogo e coloca o player
     * novamente na primeira plataforma */
    if (!this.config.savedState) {
      this.config.savedState = parsify(this.config.state);
    }

    /** Carrega as imagens como frames
     * sequenciais com estados do player */
    this.playerFrames.forEach(([src, type, index, flipped]) => {
      loadPlayer(this.config, src, type, index, flipped);
    });
  }

  loadConfig(container: HTMLElement, game: HTMLCanvasElement) {
    const { canvas } = new OffScreen(10, 10);

    const initialDomConfig = this.loadDomConfig(container, game, canvas);

    return Object.assign(
      this.defaultConfig,
      this.customConfig,
      initialDomConfig
    );
  }

  loadDomConfig(
    container: HTMLElement,
    canvas: HTMLCanvasElement,
    fallbackCanvas: HTMLCanvasElement
  ): DOMConfig {
    const ctx = canvas.getContext('2d');
    const rect = container.getBoundingClientRect();

    return {
      container,
      canvas,
      ctx,
      rect,
      animationFrames: {
        standing: [fallbackCanvas, fallbackCanvas],
        jumpingUp: [fallbackCanvas, fallbackCanvas],
        jumpingDown: [fallbackCanvas, fallbackCanvas],
        jumpingTrick: [fallbackCanvas, fallbackCanvas],
        fall1: [fallbackCanvas, fallbackCanvas],
        fall2: [fallbackCanvas, fallbackCanvas],
        frontFlip: [
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
        ],
        runningLeft: [
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
        ],
        runningRight: [
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
          fallbackCanvas,
        ],
      },
    };
  }

  addDoors(lastPlatform: Platform) {
    const { x, y } = lastPlatform;
    const doors = [new Door()];
    doors.push(new Door(x, y - 250));
    this.config.doors = doors;
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(e: KeyboardEvent) {
    this.move(e, false);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    this.move(e, true);
  }

  @HostListener('window:keypress')
  onKeyPress() {
    if (!this.config.state.touched) {
      this.config.state.touched = true;

      this.game.start();

      if (!this.player.muted) {
        this.soundConfig.thunder.play();
      }
    }
  }

  move(e: KeyboardEvent, keyDown: boolean) {
    if (e.key === 'ArrowLeft') this.config.input.left = keyDown;
    if (e.key === 'ArrowRight') this.config.input.right = keyDown;
    if (e.key === ' ') this.config.input.jump = keyDown;
  }

  onTouchStart({ action }: ControlActionEvent): void {
    this.config.input[action] = true;
    this.onKeyPress();
  }

  onTouchEnd({ action }: ControlActionEvent): void {
    this.config.input[action] = false;
  }

  toggleFullscreen() {
    if (!this.inFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  toggleVolume() {
    if (!this.player.muted) {
      this.player.mute();
    } else {
      this.player.unmute();
    }
  }

  drawCanvas() {
    const now = +(document.timeline.currentTime ?? 0);
    this.config.state.dt = now - +(this.config.state.time || now);
    this.config.state.time = now;

    if (!this.config.state.paused && !this.config.state.finished) {
      this.doCalculations();
    }

    if (!this.config.state.lastPlatform) {
      this.config.state.lastPlatform = this.config.platforms[0];
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
      if (this.level === 'training') {
        const color = {
          start: { r: 10, g: 10, b: 10 },
          end: { r: 255, g: 255, b: 255 },
        };
        drawText(this.config, 'Treino concluído!', color);
      } else {
        drawScore(this.config, this.seconds - this.timer, this.code);
      }

      if (this.config.state.winner.ready && this.config.input.jump) {
        this.config.state = parsify(this.config.savedState);
        this.player.patch(this.config.state);
        this.config.state.touched = false;
      }
    }

    if (!this.config.state.finished && this.config.state.paused) {
      drawText(this.config, 'Não foi desta vez...');

      if (this.config.state.titles.ready && this.config.input.jump) {
        this.config.state = parsify(this.config.savedState);
        this.player.patch(this.config.state);
        this.config.state.touched = false;
      }
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
        this.player.jump('up');

        if (Date.now() - this.lastUp < 6000) {
          // console.log('isFlipping', Date.now() - this.lastUp);

          this.config.state.jump.isFlipping = true;
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
      this.game.unsubscribe();
      this.player.pause();
    }

    if (this.isTheLastPlatform()) {
      this.config.state.finished = true;
      this.game.unsubscribe();
      this.player.finish();
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
            if (this.config.state.touched) {
              this.player.jump('down');
            }

            if (this.cdkPlatform.ANDROID) {
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
        if (this.config.state.touched) {
          this.player.jump('up');
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
    this.player.check(score);
  }

  async share() {
    const pre = `Opa, a torre está ${this.level} hoje! como andam suas habilidades?

*Mostra aí, me manda o código da última porta neste mapa.*`;
    const pos = `Death Tower Games`;

    const coords = this.mapToHexa(this.config.platforms);

    if (!this.route.snapshot.queryParamMap.has('coords')) {
      await this.router.navigate(['/challenge'], { queryParams: { coords } });
    }

    this.snackBar
      .open('Compartilhar via WhatsApp?', 'Sim', { duration: 6 * 1000 })
      .afterDismissed()
      .subscribe((result) => {
        if (result) {
          const url = `https://wa.me/?text=${encodeURIComponent(
            `${pre}

${window.location.href}

${pos}`
          )}`;
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      });
  }

  mapToHexa(platforms: Platform[]) {
    return platforms
      .map(({ x, y }) => `${x.toString(16)},${y.toString(16)}`)
      .join(';');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
