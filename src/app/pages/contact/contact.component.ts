import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
export class ContactPageComponent implements OnInit, OnDestroy {
  // Painting the warm gradient on <body> (the page canvas) - rather than on this
  // component's host - is the only way it can cover 100% of the screen including
  // the globally-rendered footer, which lives outside this page. The class is
  // added only while the contact page is mounted and removed on leave.
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    this.document.body.classList.add('contact-bg');
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('contact-bg');
  }
}
