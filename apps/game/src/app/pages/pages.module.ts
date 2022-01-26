import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { PlatformModule } from '@angular/cdk/platform';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { DialogModule } from '../shared/dialog/dialog.module';
import { GameModule } from '../shared/game/game.module';
import { MenuModule } from '../shared/menu/menu.module';
import { FormsModule } from '../shared/forms/forms.module';

import { PagesRoutingModule } from './pages-routing.module';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    GameComponent,
    HomeComponent
  ],
  imports: [
    GameModule,
    MenuModule,
    CommonModule,
    FormsModule,
    DialogModule,
    MatButtonModule,
    MatToolbarModule,
    PagesRoutingModule,

    OverlayModule,
    LayoutModule,
    PlatformModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
