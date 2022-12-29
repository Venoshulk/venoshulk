import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { HeroIntroductionComponent } from './hero-introduction/hero-introduction.component';
import { HeroDemoComponent } from './hero-demo/hero-demo.component';
import { SimpleCardComponent } from './simple-card/simple-card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list';
import { MainPageComponent } from './main-page/main-page.component';
import { MarchingCubePageComponent } from './marching-cube-page/marching-cube-page.component';
import { MarchingCubeIntroComponent } from './marching-cube-intro/marching-cube-intro.component';
import { MarchingCubeCardComponent } from './marching-cube-card/marching-cube-card.component';
import { MarchingCubeOptionsComponent } from './marching-cube-options/marching-cube-options.component';
import { FormsModule } from '@angular/forms';
import { MarchingThreeCanvasComponent } from './marching-three-canvas/marching-three-canvas.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeroIntroductionComponent,
    HeroDemoComponent,
    SimpleCardComponent,
    CardContainerComponent,
    MainPageComponent,
    MarchingCubePageComponent,
    MarchingCubeIntroComponent,
    MarchingCubeCardComponent,
    MarchingCubeOptionsComponent,
    MarchingThreeCanvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
