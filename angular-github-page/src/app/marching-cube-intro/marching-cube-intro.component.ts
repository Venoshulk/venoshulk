import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-marching-cube-intro',
  templateUrl: './marching-cube-intro.component.html',
  styleUrls: ['./marching-cube-intro.component.css']
})
export class MarchingCubeIntroComponent {
  isPortrait = false;

  constructor(private responsive: BreakpointObserver) {

  }

  ngOnInit() {
    this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait, Breakpoints.WebPortrait])
      .subscribe(result => {
        this.isPortrait = result.matches;
      })
  }
}
