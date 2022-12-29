import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchingCubeCardComponent } from './marching-cube-card.component';

describe('MarchingCubeCardComponent', () => {
  let component: MarchingCubeCardComponent;
  let fixture: ComponentFixture<MarchingCubeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchingCubeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchingCubeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
