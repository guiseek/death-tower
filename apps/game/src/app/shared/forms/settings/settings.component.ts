import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  JumpConfig,
  GravityConfig,
  SettingsConfig,
} from '@death-tower/core/interfaces';

const DEFAULT = {
  maxSpeed: 0.09,
  minSpeed: 0.01,
  friction: 0.7,
  acceleration: 0.02,
  jump: {
    gravity: {
      boost: 0.0014,
      normal: 0.003,
      down: 0.004,
    },
    maxSpeed: 0.6,
    fallStartSpeed: 0.07,
    friction: 0.98,
  },
};

export class GravityForm extends FormGroup {
  getValue(): GravityConfig {
    return this.value;
  }

  constructor({ boost, normal, down } = DEFAULT.jump.gravity) {
    super({
      boost: new FormControl(boost, [Validators.required]),
      normal: new FormControl(normal, [Validators.required]),
      down: new FormControl(down, [Validators.required]),
    });
  }
}

export class JumpForm extends FormGroup {
  getValue(): JumpConfig {
    return this.value;
  }

  constructor({ maxSpeed, fallStartSpeed, friction, gravity } = DEFAULT.jump) {
    super({
      gravity: new GravityForm(gravity),
      maxSpeed: new FormControl(maxSpeed, [Validators.required]),
      fallStartSpeed: new FormControl(fallStartSpeed, [Validators.required]),
      friction: new FormControl(friction, [Validators.required]),
    });
  }
}

export class SettingsForm extends FormGroup {
  getValue(): SettingsConfig {
    return this.value;
  }

  constructor({ maxSpeed, minSpeed, friction, acceleration, jump } = DEFAULT) {
    super({
      jump: new JumpForm(jump),
      maxSpeed: new FormControl(maxSpeed, [Validators.required]),
      minSpeed: new FormControl(minSpeed, [Validators.required]),
      friction: new FormControl(friction, [Validators.required]),
      acceleration: new FormControl(acceleration, [Validators.required]),
    });
  }
}

@Component({
  selector: 'dt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form = new SettingsForm();

  ngOnInit(): void {
    console.log(this.form.value);
  }
}
