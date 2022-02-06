import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event', () => {
    const element = component['_elRef'].nativeElement;

    jest.spyOn(element, 'blur');

    fixture.elementRef.nativeElement.click();

    expect(element.blur).toHaveBeenCalledTimes(1);
  });

  it('should emit touch event', () => {
    jest.spyOn(component.touch, 'emit');

    fixture.elementRef.nativeElement.click();

    expect(component.touch.emit).toHaveBeenCalledTimes(1);
  });

  it('should press jump mouse event', () => {
    jest.spyOn(component.touch, 'emit');

    fixture.elementRef.nativeElement.click();

    expect(component.touch.emit).toHaveBeenCalledWith({
      event: new MouseEvent('click'),
      action: 'jump',
      time: 'press',
    });
  });
});
