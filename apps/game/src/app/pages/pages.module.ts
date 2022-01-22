import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GameModule } from '../shared/game/game.module';
import { PagesRoutingModule } from './pages-routing.module';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    GameModule,
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
