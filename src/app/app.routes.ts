import { Routes } from '@angular/router';
import { MobileUnsupportedComponent } from './pages/mobile-unsupported/mobile-unsupported.component';
import { ElalCargoComponent } from './pages/elal-cargo/elal-cargo.component';
import { NewHomeComponent } from './pages/new-home/new-home.component';
import { ClalitComponent } from './pages/clalit/clalit.component';
import { GovOnboardingComponent } from './pages/gov-onboarding/gov-onboarding.component';
import { GovShahafComponent } from './pages/gov-shahaf/gov-shahaf.component';
import { RamAderetComponent } from './pages/ram-aderet/ram-aderet.component';
import { ElalGlobalyComponent } from './pages/elal-globaly/elal-globaly.component';
import { VonoteamComponent } from './pages/vonoteam/vonoteam.component';
import { AbraComponent } from './pages/abra/abra.component';
import { AppliedMaterialsComponent } from './pages/applied-materials/applied-materials.component';
import { CellcomPocComponent } from './pages/cellcom-poc/cellcom-poc.component';

export const routes: Routes = [
  { path: '', component: NewHomeComponent },
  { path: 'mobile-unsupported', component: MobileUnsupportedComponent },
  { path: 'elal-cargo', component: ElalCargoComponent },
  { path: 'elal-globaly', component: ElalGlobalyComponent },
  { path: 'clalit', component: ClalitComponent },
  { path: 'gov-onboarding', component: GovOnboardingComponent },
  { path: 'gov-shahaf', component: GovShahafComponent },
  { path: 'ram-aderet', component: RamAderetComponent },
  { path: 'vonoteam', component: VonoteamComponent },
  { path: 'abra', component: AbraComponent },
  { path: 'applied-materials', component: AppliedMaterialsComponent },
  { path: 'cellcom-poc', component: CellcomPocComponent },
];
