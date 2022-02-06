import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuComponent } from './menu.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'map-menu-test',
  template: `
    <map-menu>
      <button>Dificuldade</button>
      <a map-menu-item>treino</a>
      <a map-menu-item>fácil</a>
      <a map-menu-item>médio</a>
      <a map-menu-item>difícil</a>
    </map-menu>
  `,
})
class MenuTestComponent {}

describe('MenuComponent', () => {
  let component: MenuTestComponent;

  let fixture: ComponentFixture<MenuTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MenuTestComponent, MenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTestComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly menu label', () => {
    expect(
      fixture.debugElement.query(By.css('map-menu')).query(By.css('button'))
        .nativeElement.innerHTML
    ).toContain('Dificuldade');
  });

  it('should correctly project the itens', () => {
    const menuItems = fixture.debugElement.queryAll(
      By.css('map-menu .dropdown-content a')
    );

    expect(menuItems.length).toBeGreaterThanOrEqual(4);
  });
});
