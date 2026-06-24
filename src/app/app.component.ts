import { Component, ChangeDetectionStrategy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

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

      // Drive scroll on navigation ourselves. Angular's built-in scroll
      // restoration / anchor scrolling use window.scrollTo, but this site
      // scrolls <body> (overflow-x:hidden promotes it to the scroller), so
      // those are no-ops here. A fragment URL (e.g. /#home-projects) scrolls to
      // that section; everything else starts at the top.
      if (event instanceof NavigationEnd) {
        const fragment = this.router.parseUrl(event.urlAfterRedirects).fragment;
        if (fragment) {
          this.scrollToAnchor(fragment);
        } else {
          this.scrollToTop();
        }
      }
    });
  }

  /** Nav-height offset so an anchored section isn't hidden under the fixed header. */
  private static readonly HEADER_OFFSET = 92;

  private scrollToTop(): void {
    if (!this.isBrowser) {
      return;
    }
    // Reset now and after the next frame, so it sticks once the freshly routed
    // (and possibly lazy-loaded) view has laid out.
    this.scrollDocTo(0);
    requestAnimationFrame(() => this.scrollDocTo(0));
  }

  private scrollToAnchor(id: string): void {
    if (!this.isBrowser) {
      return;
    }
    const go = () => {
      const el = document.getElementById(id);
      if (!el) {
        return;
      }
      const current =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const y = current + el.getBoundingClientRect().top - AppComponent.HEADER_OFFSET;
      this.scrollDocTo(Math.max(0, y), true);
    };
    // The target view (and its lazy content) needs a beat to lay out before its
    // position is final.
    requestAnimationFrame(() => requestAnimationFrame(go));
    setTimeout(go, 150);
  }

  /** Scroll the document to `y`, hitting every candidate so the real scroller
   *  (the <body> on this site) responds regardless of which one it is. */
  private scrollDocTo(y: number, smooth = false): void {
    const opts: ScrollToOptions = { top: y, behavior: smooth ? 'smooth' : 'auto' };
    try {
      window.scrollTo(opts);
    } catch {
      /* older browsers */
    }
    document.scrollingElement?.scrollTo?.(opts);
    document.documentElement.scrollTo?.(opts);
    document.body.scrollTo?.(opts);
  }
}
