import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { ContactComponent } from '../../components/contact/contact.component';

/**
 * About Me page. Editorial two-section layout themed to match the home page
 * (warm gradient display type, soft glow blobs, texture overlay) with a
 * staggered entrance and scroll-reveal. Content is the real bio copy.
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealOnScrollDirective, ContactComponent],
})
export class AboutComponent {}
