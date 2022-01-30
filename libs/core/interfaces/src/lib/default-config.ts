export type ControlAction = 'left' | 'right' | 'jump' | 'fullscreen';

export type ControlType = 'button' | 'joystick' | 'keyboard';

export type ControlTime = 'press' | 'hold' | 'release';

export interface ControlActionEvent {
  event: TouchEvent | PointerEvent;
  action: ControlAction;
  time: ControlTime;
}

export interface BrickConfig {
  shine: string;
  shade: string;
  color: string;
  width: number;
  height: number;
  padding: number;
}

export interface ColorsConfig {
  bg: string;
  wood1: string;
  wood2: string;
  wood3: string;
  wood4: string;
  wood5: string;
}

export interface PlatformConfig {
  height: number;
  width: number;
  color: string;
}

export interface SkyConfig {
  bg: string;
  starSizes: number[];
  starColors: string[];
}

export interface StorageConfig {
  bricks: Record<string, HTMLCanvasElement> | null;
  sky: HTMLCanvasElement | null;
  shadows: HTMLCanvasElement | null;
}

export interface TowerConfig {
  width: number;
  shadowWidth: number;
  skyWidth: number;
}

export interface DefaultConfig {
  brick: BrickConfig;
  platform: PlatformConfig;
  tower: TowerConfig;
  sky: SkyConfig;
  colors: ColorsConfig;
  storage: StorageConfig;
  input: Record<ControlAction, boolean>;
}
