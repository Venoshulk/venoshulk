import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchingCubePageComponent } from './marching-cube-page.component';

describe('MarchingCubePageComponent', () => {
  let component: MarchingCubePageComponent;
  let fixture: ComponentFixture<MarchingCubePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchingCubePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchingCubePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
