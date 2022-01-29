import { GravityConfig, JumpConfig } from '@death-tower/core/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'death-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  form = this.builder.group({
    maxSpeed: [0.09, [Validators.required]],
    minSpeed: [0.01, [Validators.required]],
    friction: [0.7, [Validators.required]],
    acceleration: [0.02, [Validators.required]],
    jump: this.createJump(),
  })

  constructor(private builder: FormBuilder) { }

  createJump({
    maxSpeed = 0.6,
    fallStartSpeed = 0.07,
    friction = 0.98,
    gravity,
  }: Partial<JumpConfig> = {}) {
    return this.builder.group({
      gravity: this.createGravity(gravity),
      maxSpeed: [maxSpeed, [Validators.required]],
      fallStartSpeed: [fallStartSpeed, [Validators.required]],
      friction: [friction, [Validators.required]],
    });
  }

  createGravity({
    boost = 0.0014,
    normal = 0.003,
    down = 0.004,
  }: Partial<GravityConfig> = {}) {
    return this.builder.group({
      boost: [boost, [Validators.required]],
      normal: [normal, [Validators.required]],
      down: [down, [Validators.required]],
    });
  }
}
