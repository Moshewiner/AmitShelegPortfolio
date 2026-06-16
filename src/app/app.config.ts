import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

// Shared application providers, used by both the browser bootstrap (main.ts)
// and the server/prerender bootstrap (app.config.server.ts).
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideAnimationsAsync(),
    // Reuse the prerendered home HTML instead of re-rendering from scratch, so
    // the first paint the user sees is the real page (not a blank screen).
    provideClientHydration(withEventReplay()),
    // Path-based routing (no hash). Required for prerendering the home page to
    // static HTML, and gives clean URLs (/elal-cargo instead of /#/elal-cargo).
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
  ],
};
