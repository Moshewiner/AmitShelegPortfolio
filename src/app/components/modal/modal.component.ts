import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { TitleCasePipe } from '../../pipes/title-case.pipe';

@Component({
    selector: 'app-modal',
    imports: [TitleCasePipe],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    animations: [
        // The shared-element morph (a flying clone of the cover image into the
        // hero) is owned by the base page. The modal itself just fades the
        // backdrop and content in/out so the morph target stays stable.
        trigger('backdropAnimation', [
            state('closed', style({ opacity: 0 })),
            state('open', style({ opacity: 1 })),
            transition('closed => open', animate('320ms cubic-bezier(.23,.1,.32,1)')),
            transition('open => closed', animate('260ms ease'))
        ]),
        trigger('drawerAnimation', [
            state('closed', style({ transform: 'translateY(100%)' })),
            state('open', style({ transform: 'translateY(0)' })),
            transition('closed => open', animate('420ms cubic-bezier(.32,.72,0,1)')),
            transition('open => closed', animate('320ms cubic-bezier(.32,.72,0,1)'))
        ])
    ]
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() clientName = '';
  @Input() itemRect: DOMRect | null = null;
  @Output() closeModal = new EventEmitter<void>();

  public animationParams = {
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  };

  private originalBodyOverflow: string = '';

  ngOnInit() {
    // Save original body overflow state
    this.originalBodyOverflow = document.body.style.overflow || '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        // Save current state and prevent body scroll
        this.originalBodyOverflow = document.body.style.overflow || '';
        document.body.style.overflow = 'hidden';
      } else {
        // Restore original body scroll state
        document.body.style.overflow = this.originalBodyOverflow;
      }
    }
    
    // Update animation params whenever itemRect changes or modal opens
    if ((changes['itemRect'] || changes['isOpen']) && this.itemRect) {
      this.animationParams = {
        top: `${this.itemRect.top}`,
        left: `${this.itemRect.left}`,
        width: `${this.itemRect.width}`,
        height: `${this.itemRect.height}`
      };
    }
  }

  ngOnDestroy() {
    // Restore original body scroll state
    document.body.style.overflow = this.originalBodyOverflow;
  }

  onClose() {
    // The overflow will be restored by ngOnChanges when isOpen becomes false
    this.closeModal.emit();
  }

  onBackdropClick(event: Event) {
    // Close modal when clicking backdrop
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  // Prevent closing when clicking inside modal content
  onModalContentClick(event: Event) {
    event.stopPropagation();
  }
} 