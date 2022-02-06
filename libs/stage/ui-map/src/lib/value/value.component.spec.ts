import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueComponent } from './value.component';

describe('ValueComponent', () => {
  let component: ValueComponent;
  let fixture: ComponentFixture<ValueComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show value', () => {
    component.value = 1;
    fixture.detectChanges();
    const h3 = element.querySelector('h3');
    expect(h3?.textContent).toEqual('1');
  });

  it('should show text', () => {
    component.text = 'desc';
    fixture.detectChanges();
    const span = element.querySelector('span');
    expect(span?.textContent).toEqual('desc');
  });

  it('should without s', () => {
    const small = element.querySelector('small');
    expect(small).toBeNull();
  });

  it('should with s', () => {
    component.withS = true;
    fixture.detectChanges();
    const small = element.querySelector('small');

    expect(small?.textContent).toEqual('s');
  });
});
