import { Injectable } from 'service-seeker'

@Injectable()
export class AudioService<Types> {
  private _audio = new Map<Types, HTMLAudioElement>([])

  add(type: Types, url: URL) {
    this._audio.set(type, new Audio(url.pathname))
  }

  get(type: Types) {
    return this._audio.get(type)
  }
}
