import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactComponent } from '../../components/contact/contact.component';

/**
 * Dedicated /contact page. Themed to match the home/about pages (warm glow
 * blobs + texture) and hosts the shared contact card in its pinned, scroll-
 * scrubbed mode.
 */
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactComponent],
})
export class ContactPageComponent {}
