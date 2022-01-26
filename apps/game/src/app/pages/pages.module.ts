import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlatformModule } from '@angular/cdk/platform';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { DialogModule } from '../shared/dialog/dialog.module';
import { GameModule } from '../shared/game/game.module';
import { PagesRoutingModule } from './pages-routing.module';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { MenuModule } from '../shared/menu/menu.module';


@NgModule({
  declarations: [
    GameComponent,
    HomeComponent
  ],
  imports: [
    GameModule,
    MenuModule,
    CommonModule,
    DialogModule,
    PagesRoutingModule,

    OverlayModule,
    LayoutModule,
    PlatformModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
