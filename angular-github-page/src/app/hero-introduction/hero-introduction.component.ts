import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-introduction',
  templateUrl: './hero-introduction.component.html',
  styleUrls: ['./hero-introduction.component.css']
})
export class HeroIntroductionComponent implements OnInit {
  isPhonePortrait = false;

  constructor(private responsive: BreakpointObserver) {

  }

  ngOnInit() {
    this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isPhonePortrait = result.matches;
      })
  }
}
