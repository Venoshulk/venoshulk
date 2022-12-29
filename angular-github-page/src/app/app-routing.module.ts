import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { MarchingCubePageComponent } from './marching-cube-page/marching-cube-page.component';

const routes: Routes = [
  { path: 'marching-cubes', component: MarchingCubePageComponent, title: 'A Quick Note: Marching Cubes' },
  { path: '', component: MainPageComponent, title: 'Hello, World!' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
