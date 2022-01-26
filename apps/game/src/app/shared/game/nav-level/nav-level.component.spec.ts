import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLevelComponent } from './nav-level.component';

describe('NavLevelComponent', () => {
  let component: NavLevelComponent;
  let fixture: ComponentFixture<NavLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
