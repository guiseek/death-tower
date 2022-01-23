import { CustomConfig } from '../custom-config';
import { DefaultConfig } from '../default-config';
import { DOMConfig } from '../dom-config';

export type Config = DOMConfig & DefaultConfig & CustomConfig;
