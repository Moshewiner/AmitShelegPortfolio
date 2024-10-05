import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BeautyZoneComponent } from './pages/beauty-zone/beauty-zone.component';
import { WiseHomeComponent } from './pages/wise-home/wise-home.component';
import { AddictComponent } from './pages/addict/addict.component';
import { MobileUnsupportedComponent } from './pages/mobile-unsupported/mobile-unsupported.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'beautyzone', component: BeautyZoneComponent },
  { path: 'wisehome', component: WiseHomeComponent },
  { path: 'addict', component: AddictComponent },
  { path: 'mobile-unsupported', component: MobileUnsupportedComponent },
];
