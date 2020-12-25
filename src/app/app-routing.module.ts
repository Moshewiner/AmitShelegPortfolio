import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {BeautyZoneComponent} from './pages/beauty-zone/beauty-zone.component';
import { WiseHomeComponent } from './pages/wise-home/wise-home.component';

const routes: Routes = [
  { path: '', component: BeautyZoneComponent },
  { path: 'home', component: HomeComponent },
  { path: 'beautyzone', component: BeautyZoneComponent},
  { path: 'wisehome', component: WiseHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
