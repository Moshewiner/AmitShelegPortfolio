import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { trigger, style, transition, animate, query, animateChild } from '@angular/animations';
import { TitleCasePipe } from '../../pipes/title-case.pipe';

@Component({
    selector: 'app-modal',
    imports: [TitleCasePipe],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    animations: [
        // The @if is on the (non-animated) backdrop host. Without this, Angular
        // tears the whole subtree out on close BEFORE the child dim/sheet :leave
        // can play — so the drawer would vanish instead of sliding down. This
        // host trigger defers removal and explicitly runs the child animations.
        trigger('sheetHost', [
            transition(':enter', [query('@*', animateChild(), { optional: true })]),
            transition(':leave', [query('@*', animateChild(), { optional: true })]),
        ]),
        // iOS-style sheet: the backdrop dims in/out while the sheet slides up
        // from the bottom on present and back down on dismiss. :enter/:leave
        // (rather than state transitions) so it animates every time the @if
        // adds/removes the modal — including the very first open.
        trigger('backdropAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('400ms ease', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('300ms ease', style({ opacity: 0 })),
            ]),
        ]),
        trigger('drawerAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(100%)' }),
                // Apple's sheet easing (a soft, slightly overshoot-free spring).
                animate('480ms cubic-bezier(0.32, 0.72, 0, 1)', style({ transform: 'translateY(0)' })),
            ]),
            transition(':leave', [
                animate('360ms cubic-bezier(0.32, 0.72, 0, 1)', style({ transform: 'translateY(100%)' })),
            ]),
        ]),
    ]
})
export class ModalComponent implements OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() clientName = '';
  @Output() closeModal = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      // Lock body scroll while open; on close always reset to the natural
      // (stylesheet-driven) state. We intentionally do NOT save/restore a
      // "previous" inline value: the app never sets an inline body overflow in
      // its normal state, and capturing one can race with lifecycle/@defer
      // timing, which previously restored 'hidden' and left the page stuck.
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
  }

  ngOnDestroy() {
    // Never leave the body locked if the modal is torn down while open.
    document.body.style.overflow = '';
  }

  onClose() {
    // The overflow will be restored by ngOnChanges when isOpen becomes false.
    this.closeModal.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  // Prevent closing when clicking inside modal content
  onModalContentClick(event: Event) {
    event.stopPropagation();
  }
}
