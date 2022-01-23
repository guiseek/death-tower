import { Door } from './door';
import { Platform } from './platform';
import { StateConfig } from './state-config';

export interface CustomConfig {
  platforms: Platform[];
  doors: Door[];
  state: StateConfig;
  savedState: StateConfig | null;
}
