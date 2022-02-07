import { InjectionToken } from '@angular/core';
import { Song } from './types/song';

export const RADIO_CONFIG = new InjectionToken<Song[]>('radio.config');
