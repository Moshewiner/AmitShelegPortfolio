import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {BeautyZoneComponent} from './pages/beauty-zone/beauty-zone.component';

const routes: Routes = [
  { path: '', component: BeautyZoneComponent },
  { path: 'home', component: HomeComponent },
  { path: 'beautyzone', component: BeautyZoneComponent},
  { path: 'wisehome', component: BeautyZoneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
