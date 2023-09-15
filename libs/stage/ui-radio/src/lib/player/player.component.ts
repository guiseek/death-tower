import {
  Inject,
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MatLegacyButton as MatButton } from '@angular/material/legacy-button';

import { RADIO_CONFIG } from '../stage-ui-radio.config';
import { FileSystem } from '../utilities/file-system';
import { Song } from '../types/song';

@Component({
  selector: 'radio-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  providers: [FileSystem],
})
export class PlayerComponent implements AfterViewInit {
  @ViewChild('audio')
  audioRef!: ElementRef<HTMLAudioElement>;
  audio!: HTMLAudioElement;

  @ViewChild('play')
  playRef!: MatButton;
  play!: HTMLButtonElement;

  @ViewChild('prev')
  prevRef!: MatButton;
  prev!: HTMLButtonElement;

  @ViewChild('next')
  nextRef!: MatButton;
  next!: HTMLButtonElement;

  @ViewChild('mute')
  muteRef!: MatButton;
  mute!: HTMLButtonElement;

  song?: Song;

  constructor(
    readonly fileSystem: FileSystem,
    @Inject(RADIO_CONFIG)
    readonly songList: Song[] = []
  ) {
    console.log(this.fileSystem);
  }

  ngAfterViewInit() {
    this.audio = this.audioRef.nativeElement;
    this.audio.src = this.songList[0].src;
    this.audio.dataset['id'] = `1`;

    const prevRef = this.prevRef._elementRef;
    this.prev = prevRef.nativeElement;

    const playRef = this.playRef._elementRef;
    this.play = playRef.nativeElement;

    const nextRef = this.nextRef._elementRef;
    this.next = nextRef.nativeElement;

    const muteRef = this.muteRef._elementRef;
    this.mute = muteRef.nativeElement;

    this.audio.onended = () => this.onNext();
  }

  onPrev() {
    const current = this.audio.dataset['id'] ?? 0;

    const index = this.findSongIndex(+current);

    if (index === 0) {
      this.song = this.songList[this.songList.length - 1];
    } else {
      this.song = this.songList[index - 1];
    }

    this.audio.dataset['id'] = `${this.song.id}`;
    this.audio.src = this.song.src;
    this.audio.play();
    this.prev.blur();
  }

  onPlay() {
    const current = this.audio.dataset['id'] ?? 0;

    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.song = this.findSong(+current);

    this.play.blur();
  }

  onNext() {
    const current = this.audio.dataset['id'] ?? 0;

    const index = this.findSongIndex(+current);

    if (index === this.songList.length - 1) {
      this.song = this.songList[0];
    } else {
      this.song = this.songList[index + 1];
    }

    this.audio.dataset['id'] = `${this.song.id}`;
    this.audio.src = this.song.src;
    this.audio.play();
    this.next.blur();
  }

  findSong(id: number) {
    return this.songList.find((song) => song.id === id);
  }

  findSongIndex(id: number) {
    return this.songList.findIndex((song) => song.id === id);
  }

  onMute() {
    this.audio.muted = !this.audio.muted;
    this.mute.blur();
  }

  onChange(value: number | null) {
    this.audio.currentTime = value ?? 0;
  }
}
