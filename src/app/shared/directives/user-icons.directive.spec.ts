import { UserIconsDirective } from './user-icons.directive';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `<div [appUserIcons]="iconType"></div>`
})
class TestComponent {
  iconType: string = '';
}

describe('UserIconsDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, UserIconsDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement.querySelector('div');
  });

  it('should set background color to #d6eaff for male', () => {
    component.iconType = 'male';
    fixture.detectChanges();
    expect(el.style.backgroundColor).toBe('rgb(214, 234, 255)');
  });

  it('should set background color to #fce5ff for female', () => {
    component.iconType = 'female';
    fixture.detectChanges();
    expect(el.style.backgroundColor).toBe('rgb(252, 229, 255)');
  });

  it('should set background color to #d8ffc0 for active', () => {
    component.iconType = 'active';
    fixture.detectChanges();
    expect(el.style.backgroundColor).toBe('rgb(216, 255, 192)');
  });

  it('should set background color to #ffc0c0 for inactive', () => {
    component.iconType = 'inactive';
    fixture.detectChanges();
    expect(el.style.backgroundColor).toBe('rgb(255, 192, 192)');
  });
});