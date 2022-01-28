import { Platform as CdkPlatform } from '@angular/cdk/platform';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { filter, fromEvent, repeat, Subject, takeUntil, timer } from 'rxjs';
import {
  OnInit,
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject,
  TemplateRef,
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
  loadImage,
  parsify,
} from '@death-tower/core/util-config';

import {
  Door,
  drawSky,
  drawDoors,
  OffScreen,
  drawBricks,
  drawPlayer,
  drawShadows,
  drawPlatforms,
  drawWinner,
  drawText,
} from '@death-tower/core/util-map';

import { GameState, PlayerState } from '../../+state';

import {
  PlayerFramesConfig,
  PLAYER_FRAMES_CONFIG,
} from '../../state-tower.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipsService } from '../../components/tips/tips.service';

const dir = '/assets/sounds';

// const clockTicking = new Audio(`${dir}/ambient/clock-ticking.mp3`);
const jumpingDown = new Audio(`${dir}/jump-spring-down.mp3`);
const jumpingUp = new Audio(`${dir}/jump-spring-up.mp3`);
const thunder = new Audio(`${dir}/thunder-rumble.mp3`);
const yeaah = new Audio(`${dir}/zumbi/yeaah.mp3`);
const scream = new Audio(`${dir}/scream.mp3`);

const DEATH_MESSAGES = [
  'Não foi desta vez..',
  '+ sorte na próxima!',
  'gRrr... agora vai!!',
  'Meu deus! de novo?!',
  'Vai na humildade...',
  'Faltou disciplina..',
  'Vai fica morrendo?!',
  'Já é hora de passar',
  'PQP, ta me tirando.',
  'MANO!! CÉLOKO TRUTA',
];

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

  level = '';

  readonly game = new GameState();
  readonly player = new PlayerState();

  readonly hideElement$;

  constructor(
    media: MediaMatcher,
    cdr: ChangeDetectorRef,
    private router: Router,
    private tips: TipsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cdkPlatform: CdkPlatform,

    @Inject(PLAYER_FRAMES_CONFIG)
    readonly playerFrames: PlayerFramesConfig
  ) {
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    const idleTime$ = timer(0, 5000);
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.hideElement$ = idleTime$.pipe(takeUntil(mouseMove$), repeat());
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
      .open('Compartilhar via WhatsApp?', 'Sim')
      .afterDismissed()
      .subscribe(() => {
        const url = `https://wa.me/?text=${encodeURIComponent(
          `${pre}

${window.location.href}

${pos}`
        )}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
  }

  mapToHexa(platforms: Platform[]) {
    return platforms
      .map(({ x, y }) => `${x.toString(16)},${y.toString(16)}`)
      .join(';');
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
      .subscribe(() => {
        this.onRouting(this.route.snapshot);
      });

    this.player.gameover$
      .pipe(takeUntil(this.destroy))
      .subscribe((gameover) => {
        console.log('gameover: ', gameover);
        this.player.restart();
      });

    this.player.paused$.pipe(takeUntil(this.destroy)).subscribe((paused) => {
      if (paused) {
        this.player.restart();

        scream.play();
      }
    });

    this.player.finished$
      .pipe(takeUntil(this.destroy))
      .subscribe((finished) => {
        if (finished) {
          yeaah.play();
        }
      });

    this.player.jumpingUp$.pipe(takeUntil(this.destroy)).subscribe((jump) => {
      if (jump && jumpingUp.paused) {
        jumpingUp.play();
      }
    });

    this.player.jumpingDown$.pipe(takeUntil(this.destroy)).subscribe((jump) => {
      if (jump && jumpingDown.paused) {
        jumpingDown.play();
      }
    });
  }

  ngAfterViewInit(): void {
    this.loadMap();

    /**
     * Atualiza plataformas na torre
     */
    this.game.platforms$
      .pipe(takeUntil(this.destroy))
      .subscribe((platforms) => {
        if (this.config && platforms.length) {
          if (!this.config.platforms.length) {
            this.config.state.lastPlatform = platforms[0];

            /**
             * Como ainda não haviam plataformas
             * inicializa processo de renderização
             */
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

    const { canvas } = new OffScreen(10, 10);

    this.config = Object.assign(
      loadDefaultConfig(),
      loadDomConfig(container, game, canvas),
      loadCustomConfig({ doors: [] })
    );

    /**
     * Reinicia o jogo e coloca o player
     * novamente na primeira plataforma
     */
    if (!this.config.savedState) {
      this.config.savedState = parsify(this.config.state);
    }

    /**
     * Carrega as imagens como frames
     * sequenciais com estados do player
     */
    this.playerFrames.forEach(([src, type, index, flipped]) => {
      loadImage(this.config, src, type, index, flipped);
    });
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
      this.player.start();
      thunder.play();
    }
  }

  move(e: KeyboardEvent, keyDown: boolean) {
    if (e.key === 'ArrowLeft') this.config.input.left = keyDown;
    if (e.key === 'ArrowRight') this.config.input.right = keyDown;
    if (e.key === ' ') this.config.input.jump = keyDown;
  }

  onTouchStart({ action }: ControlActionEvent): void {
    this.config.input[action] = true;
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

      if (this.config.state.winner.ready && this.config.input.jump) {
        this.config.state = parsify(this.config.savedState);
        this.player.patchValue(this.config.state);
      }
    }

    if (this.config.state.paused) {
      drawText(this.config, 'Não foi desta vez...');

      if (this.config.state.titles.ready && this.config.input.jump) {
        this.config.state = parsify(this.config.savedState);
        this.player.patchValue(this.config.state);
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
      this.player.pause();

      // this.config.state = parsify(this.config.savedState);
    }

    if (this.isTheLastPlatform()) {
      this.config.state.finished = true;
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

    this.config.state.score = score;
    this.player.patchValue({ score });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}