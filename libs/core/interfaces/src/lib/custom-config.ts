import { Door } from './door';
import { Platform } from './platform';
import { StateConfig } from './state-config';
import { SettingsConfig } from './settings-config';

export interface CustomConfig {
  platforms: Platform[];
  doors: Door[];
  state: StateConfig;
  settings: SettingsConfig;
  savedState: StateConfig | null;
}
