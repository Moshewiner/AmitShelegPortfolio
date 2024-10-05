import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withHashLocation } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',  // Enables scroll position restoration
        anchorScrolling: 'enabled'            // Enables anchor scrolling
      }),
      withHashLocation()  // Optional: Use only if you want hash-based navigation
    )
  ]
}).catch(err => console.error(err));
