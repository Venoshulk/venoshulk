import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDemoComponent } from './hero-demo.component';

describe('HeroDemoComponent', () => {
  let component: HeroDemoComponent;
  let fixture: ComponentFixture<HeroDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
