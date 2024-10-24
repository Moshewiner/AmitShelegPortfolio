import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BeautyZoneComponent } from './pages/beauty-zone/beauty-zone.component';
import { WiseHomeComponent } from './pages/wise-home/wise-home.component';
import { AddictComponent } from './pages/addict/addict.component';
import { MobileUnsupportedComponent } from './pages/mobile-unsupported/mobile-unsupported.component';
import { ElalCargoComponent } from './pages/elal-cargo/elal-cargo.component';
import { ElalGlobalyComponent } from './pages/elal-globaly/elal-globaly.component';
import { RamAderetComponent } from './pages/ram-aderet/ram-aderet.component';
import { NewHomeComponent } from './pages/new-home/new-home.component';

export const routes: Routes = [
  { path: '', component: NewHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-home', component: NewHomeComponent },
  { path: 'beautyzone', component: BeautyZoneComponent },
  { path: 'wisehome', component: WiseHomeComponent },
  { path: 'addict', component: AddictComponent },
  { path: 'mobile-unsupported', component: MobileUnsupportedComponent },
  { path: 'elal-cargo', component: ElalCargoComponent },
  { path: 'elal-globaly', component: ElalGlobalyComponent },
  { path: 'ram-aderet', component: RamAderetComponent },
];
