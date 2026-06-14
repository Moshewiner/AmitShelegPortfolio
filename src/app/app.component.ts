import {Component, ChangeDetectionStrategy} from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event as RouterEvent } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NewHeaderComponent } from './components/new-header/new-header.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet, NewHeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'AmitSheleg';

  /** Controls the slim top progress bar shown during route navigation. */
  loading = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}
