import { DOCUMENT } from '@angular/common';
import {
  OnInit,
  Inject,
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { Config } from '../../types/config';
import { drawSky } from '../utilities/draw';
import { easing } from '../utilities/easing';

@Component({
  selector: 'canvas[dt-canvas],dt-canvas',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy = new Subject<void>();

  loaded = false;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    readonly elRef: ElementRef<HTMLCanvasElement>,
    private configService: ConfigService
  ) {
    console.log(this.document);
  }

  ngOnInit(): void {
    console.log('init', this.elRef.nativeElement);
    this.configService.setCanvas(this.elRef.nativeElement);

  }

  drawTitles(config: Config) {
    if (config.state.dt && config.state.titles.opacity < 100) {
      config.state.titles.opacity += Math.floor(config.state.dt * 0.2);
    }

    if (config.state.titles.opacity > 100) config.state.titles.opacity = 100;

    if (config.ctx && config.canvas) {
      config.ctx.fillStyle =
        'rgba(10, 10, 10, ' + config.state.titles.opacity / 100 + ')';
      config.ctx.rect(0, 0, config.canvas.width, config.canvas.height);
      config.ctx.fill();

      config.ctx.fillStyle =
        'rgba(255, 236, 61, ' + config.state.titles.opacity / 100 + ')';
      config.ctx.font = "64px 'Germania One', cursive";
      config.ctx.fillText(
        config.state.titles.text,
        600,
        520 - easing(config.state.titles.opacity / 100) * 40
      );

      if (config.state.titles.opacity == 100 && !config.input.jump) {
        config.state.titles.ready = true;
      }

      if (config.state.titles.ready && config.input.jump) {
        config.state = JSON.parse(JSON.stringify(config.savedState));
        config.state.lastPlatform = null;
      }
    }
  }

  ngAfterViewInit() {
    console.log('after init');
    this.configService.config$
      .pipe(
        takeUntil(this.destroy),
        take(10)
      )
      .subscribe((config) => {
        console.log('config: ', config)
        this.drawTitles(config)
        drawSky(config);
        console.log(Object.getOwnPropertyDescriptors(this));

      });
    //     if (!this.loaded) {
    //       this.configService.loadAnimations();
    //       this.loaded = true;
    //       // this.draw(config);
    //     }

    //   });
  }


  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
