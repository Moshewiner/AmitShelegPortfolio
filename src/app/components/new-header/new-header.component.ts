import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-new-header',
    templateUrl: './new-header.component.html',
    styleUrls: ['./new-header.component.scss'],
    // tslint:disable-next-line:no-host-metadata-property
    host: {
        class: 'navbar',
        '[class.expanded]': 'isExpanded'
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterModule]
})
export class NewHeaderComponent implements OnInit {
  public isExpanded = false;

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly elementRef = inject(ElementRef);

  // Google Drive *viewer* URL: opens the CV in a new browser tab instead of
  // saving it to disk. The `/file/d/<id>/view` form is what renders in-browser —
  // `uc?export=download` (and the `download` attribute, which is ignored
  // cross-origin anyway) would force a file download. The viewer still offers a
  // download button for anyone who wants the file.
  public readonly resumeUrl =
    'https://drive.google.com/file/d/1-RQ1U7u0yewrcbXvDka4yUP5zQILBIWY/view';

  public openMenu(): void {
    this.isExpanded = true;
  }
  
  public closeMenu(): void {
    this.isExpanded = false;
  }
  
  public toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
  }

  // Close the mobile menu when clicking anywhere outside the header.
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.isExpanded) {
      return;
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  ngOnInit(): void {
    // Browser-only: hide the fixed header on scroll-down, show on scroll-up.
    // Guarded so it never runs during server-side prerendering.
    if (!this.isBrowser) {
      return;
    }
    // TODO: mobile support (disable this logic on mobile)
    let prevScrollpos = window.pageYOffset;
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        // @ts-ignore
        document.getElementsByClassName('navbar')[0].style.top = '0';
      } else {
        // @ts-ignore
        document.getElementsByClassName('navbar')[0].style.top = '-120px';
      }
      prevScrollpos = currentScrollPos;
    };
  }
}
