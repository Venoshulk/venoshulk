import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchingThreeCanvasComponent } from './marching-three-canvas.component';

describe('MarchingThreeCanvasComponent', () => {
  let component: MarchingThreeCanvasComponent;
  let fixture: ComponentFixture<MarchingThreeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchingThreeCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchingThreeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
