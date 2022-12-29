import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchingCubeOptionsComponent } from './marching-cube-options.component';

describe('MarchingCubeOptionsComponent', () => {
  let component: MarchingCubeOptionsComponent;
  let fixture: ComponentFixture<MarchingCubeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchingCubeOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchingCubeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
