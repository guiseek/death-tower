import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TowerComponent } from './containers/tower/tower.component';
import { ScoreComponent } from './components/score/score.component';
import { TimerComponent } from './components/timer/timer.component';
import { MenuItemComponent } from './components/menu/menu-item.component';
import { ButtonComponent } from './components/button/button.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TowerComponent,
      },
      {
        path: ':level',
        component: TowerComponent,
      },
    ]),
  ],
  declarations: [
    TowerComponent,
    ButtonComponent,
    TimerComponent,
    ScoreComponent,
    MenuComponent,
    MenuItemComponent,
  ],
  providers: []
})
export class StageTowerModule { }
