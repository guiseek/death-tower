import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PlatformService } from '../../shared/services/platform.service';
import { ConfigService } from '../../shared/services/config.service';
import { PointService } from '../../shared/services/point.service';
import { ControlActionEvent } from '../../shared/types/control';

@Component({
  selector: 'dt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfigService, PointService, PlatformService],
})
export class GameComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  get hasFullscreen() {
    return document.fullscreenEnabled;
  }

  get inFullscreen() {
    return document.fullscreenElement;
  }

  constructor(
    private route: ActivatedRoute,
    private platformService: PlatformService,
    private configService: ConfigService,
    private pointService: PointService
  ) {
    this.platformService.platforms$
      .pipe(takeUntil(this.destroy))
      .subscribe((platforms) => {
        console.log(platforms);
        if (platforms.length) {
          this.configService.updatePlatforms(platforms);
        }
      });

    this.pointService.points$
      .pipe(takeUntil(this.destroy))
      .subscribe((points) => {
        if (points.length) {
          this.platformService.setPlatforms(points);
        }
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ level }) => {
      if (level) this.pointService.setPoints(level);
    });
  }

  onTouch({ action }: ControlActionEvent): void {
    this.configService.updateInput({ [action]: true });
  }

  toggleFullscreen() {
    if (!this.inFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
