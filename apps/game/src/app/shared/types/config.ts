import { PlayerAction } from './player';

interface InfoMessage {
  opacity: number;
  ready: boolean;
  text: string;
}

interface ClimpSpeed {
  normal: number;
  fast: number;
}

interface Jump {
  isGrounded: boolean;
  isJumping: boolean;
  isBoosting: boolean;
  speed: number;
  nextY: number;
}

interface Player {
  dir: number;
  x: number;
  y: number;
  prevY: number;
  speed: number;
  animationFrame: number;
  animationFrameCount: number;
}

interface BrickConfig {
  shine: string;
  shade: string;
  color: string;
  width: number;
  height: number;
  padding: number;
}

interface PlatformConfig {
  height: number;
  width: number;
  color: string;
}

interface TowerConfig {
  width: number;
  shadowWidth: number;
  skyWidth: number;
}

interface SkyConfig {
  bg: string;
  starSizes: number[];
  starColors: string[];
}

export interface OuterBox {
  left: number;
  right: number;
  width: number;
  unit: number;
}

export interface Platform extends Point {
  n: number;
  infront: boolean;
  outerBox: OuterBox | null;
  draw(config: Config): void;
  drawFront(config: Config): void;
  isInFront(config: Config): boolean;
}

export interface Point {
  x: number;
  y: number;
}

export interface Door extends Point {
  draw(config: Config): void;
}

export interface StateValue {
  points: number;
  lastPlatform: Platform | null;
  platformReached: Platform | null;
  paused: boolean;
  finished?: boolean;
  titles: InfoMessage;
  climbstarted: boolean;
  time: number | null;
  dt: number | null;
  climbspeed: ClimpSpeed;
  pos: Point;
  lastPos: Point;
  activePlatforms: Platform[];
  jump: Jump;
  player: Player;
}

interface ColorsConfig {
  bg: string;
  wood1: string;
  wood2: string;
  wood3: string;
  wood4: string;
  wood5: string;
}

interface GravityConfig {
  boost: number;
  normal: number;
  down: number;
}

interface JumpConfig {
  gravity: GravityConfig;
  maxSpeed: number;
  fallStartSpeed: number;
  friction: number;
}

interface SettingsConfig {
  maxSpeed: number;
  minSpeed: number;
  friction: number;
  acceleration: number;
  jump: JumpConfig;
}

interface StorageConfig {
  bricks: Record<string, HTMLCanvasElement> | null;
  sky: HTMLCanvasElement | null;
  shadows: HTMLCanvasElement | null;
}

export interface InputConfig {
  left: boolean;
  right: boolean;
  jump: boolean;
}

export interface AnimationFrameConfig {
  src: string;
  type: PlayerAction;
  index: number;
  flipped: boolean;
}

export type AnimationFrames = Record<PlayerAction, AnimationFrameConfig[]>;

export interface AnimationFramesConfig {
  standing: HTMLCanvasElement[];
  jumpingUp: HTMLCanvasElement[];
  jumpingDown: HTMLCanvasElement[];
  runningLeft: HTMLCanvasElement[];
  runningRight: HTMLCanvasElement[];
}

export interface StateConfig {
  points: number;
  lastPlatform: Platform | null;
  platformReached: Platform | null;
  paused: boolean;
  finished: boolean;
  titles: InfoMessage;
  climbstarted: boolean;
  time: number | null;
  dt: number | null;
  climbspeed: ClimpSpeed;
  pos: Point;
  lastPos: Point;
  activePlatforms: Platform[];
  jump: Jump;
  player: Player;
}

export interface DOMConfig {
  container: HTMLElement | null;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  rect: DOMRect | null;
  animationFrames: AnimationFramesConfig;
}

export interface DefaultConfig {
  brick: BrickConfig;
  platform: PlatformConfig;
  tower: TowerConfig;
  sky: SkyConfig;
  colors: ColorsConfig;
  settings: SettingsConfig;
  storage: StorageConfig;
  input: InputConfig;
}

export interface CustomConfig {
  platforms: Platform[];
  doors: Door[];
  state: StateConfig;
  savedState: null;
}

export type Config = DOMConfig & DefaultConfig & CustomConfig;
