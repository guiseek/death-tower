import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatButton } from '@angular/material/button';

interface Song {
  id: number;
  name: string;
  artist: string;
  src: string;
}

@Component({
  selector: 'radio-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
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

  private songList: Song[] = [
    {
      id: 1,
      name: 'Ray Sky',
      artist: 'Gamma',
      src: '/assets/radio/gamma-ray-sky.mp3',
    },
    {
      id: 2,
      name: 'White Crowned',
      artist: 'Sparrow',
      src: '/assets/radio/white-crowned_sparrow.mp3',
    },
    {
      id: 3,
      name: 'Respect Me',
      artist: 'Gamma',
      src: '/assets/radio/respect-me.mp3',
    },
    {
      id: 4,
      name: 'Tool Kit',
      artist: 'Gamma',
      src: '/assets/radio/tool-kit.mp3',
    },
    {
      id: 5,
      name: 'Inside My Mind',
      artist: 'Gamma',
      src: '/assets/radio/inside-my-mind.mp3',
    },
  ];

  ngAfterViewInit() {
    this.audio = this.audioRef.nativeElement;
    this.audio.src = this.songList[0].src;
    this.audio.dataset['id'] = `1`;

    const playRef = this.playRef._elementRef;
    this.play = playRef.nativeElement;

    const muteRef = this.muteRef._elementRef;
    this.mute = muteRef.nativeElement;

    this.audio.onended = () => this.onNext();
  }

  onPrev() {
    const current = this.audio.dataset['id'] ?? 0;

    const index = this.songList.findIndex((song) => song.id === +current);
    let nextSong: Song;

    if (index === 0) {
      nextSong = this.songList[this.songList.length - 1];
    } else {
      nextSong = this.songList[index - 1];
    }

    this.audio.dataset['id'] = `${nextSong.id}`;
    this.audio.src = nextSong.src;
    this.audio.play();
  }

  onNext() {
    const current = this.audio.dataset['id'] ?? 0;

    const index = this.songList.findIndex((song) => song.id === +current);
    let nextSong: Song;

    if (index === this.songList.length - 1) {
      nextSong = this.songList[0];
    } else {
      nextSong = this.songList[index + 1];
    }

    this.audio.dataset['id'] = `${nextSong.id}`;
    this.audio.src = nextSong.src;
    this.audio.play();
  }

  onChange(value: number | null) {
    if (value) {
      this.audio.currentTime = value;
    } else {
      this.audio.currentTime = 0;
    }
  }

  onPlay() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.play.blur();
  }

  onMute() {
    this.mute.blur();

    this.audio.muted = !this.audio.muted;
  }
}
