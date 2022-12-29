import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchingCubeIntroComponent } from './marching-cube-intro.component';

describe('MarchingCubeIntroComponent', () => {
  let component: MarchingCubeIntroComponent;
  let fixture: ComponentFixture<MarchingCubeIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchingCubeIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchingCubeIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
