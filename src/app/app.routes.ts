import { Routes } from '@angular/router';
import { NewHomeComponent } from './pages/new-home/new-home.component';

// Only the landing page is eagerly bundled. Every project/detail page is
// lazy-loaded as its own chunk so the initial download + parse (which gates
// first paint on mobile) stays as small as possible.
export const routes: Routes = [
  { path: '', component: NewHomeComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactPageComponent),
  },
  {
    path: 'mobile-unsupported',
    loadComponent: () =>
      import('./pages/mobile-unsupported/mobile-unsupported.component').then(
        (m) => m.MobileUnsupportedComponent
      ),
  },
  {
    path: 'routines',
    loadComponent: () =>
      import('./pages/routines/routines.component').then((m) => m.RoutinesComponent),
  },
  {
    path: 'elal-cargo',
    loadComponent: () =>
      import('./pages/elal-cargo/elal-cargo.component').then((m) => m.ElalCargoComponent),
  },
  {
    path: 'elal-globaly',
    loadComponent: () =>
      import('./pages/elal-globaly/elal-globaly.component').then((m) => m.ElalGlobalyComponent),
  },
  {
    path: 'clalit',
    loadComponent: () => import('./pages/clalit/clalit.component').then((m) => m.ClalitComponent),
  },
  {
    path: 'gov-onboarding',
    loadComponent: () =>
      import('./pages/gov-onboarding/gov-onboarding.component').then(
        (m) => m.GovOnboardingComponent
      ),
  },
  {
    path: 'gov-shahaf',
    loadComponent: () =>
      import('./pages/gov-shahaf/gov-shahaf.component').then((m) => m.GovShahafComponent),
  },
  {
    path: 'ram-aderet',
    loadComponent: () =>
      import('./pages/ram-aderet/ram-aderet.component').then((m) => m.RamAderetComponent),
  },
  {
    path: 'vonoteam',
    loadComponent: () =>
      import('./pages/vonoteam/vonoteam.component').then((m) => m.VonoteamComponent),
  },
  {
    path: 'abra',
    loadComponent: () => import('./pages/abra/abra.component').then((m) => m.AbraComponent),
  },
  {
    path: 'applied-materials',
    loadComponent: () =>
      import('./pages/applied-materials/applied-materials.component').then(
        (m) => m.AppliedMaterialsComponent
      ),
  },
  {
    path: 'cellcom-poc',
    loadComponent: () =>
      import('./pages/cellcom-poc/cellcom-poc.component').then((m) => m.CellcomPocComponent),
  },
];
