import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlatformModule } from '@angular/cdk/platform';
import { LayoutModule } from '@angular/cdk/layout';

import { GameModule } from '../shared/game/game.module';
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
    CommonModule,
    LayoutModule,
    PlatformModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
