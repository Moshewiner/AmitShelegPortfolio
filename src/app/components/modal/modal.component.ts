import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [
    trigger('backdropAnimation', [
      state('closed', style({ opacity: 0 })),
      state('open', style({ opacity: 1 })),
      transition('closed => open', animate('1500ms cubic-bezier(.23,.1,.32,1)')),
      transition('open => closed', animate('600ms cubic-bezier(.68,-.55,.265,1.55)'))
    ]),
    trigger('modalAnimation', [
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.85) translateY(50px)'
      })),
      state('open', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })),
      transition('closed => open', [
        style({
          position: 'fixed',
          top: '{{ top }}px',
          left: '{{ left }}px',
          width: '{{ width }}px',
          height: '{{ height }}px',
          borderRadius: '16px',
          transform: 'scale(1)',
          transformOrigin: 'center center',
          opacity: 1,
          overflow: 'hidden'
        }),
        animate('2000ms cubic-bezier(.23,.1,.32,1)', style({
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          transform: 'scale(1)',
          opacity: 1,
          overflow: 'auto'
        }))
      ], { params: { top: '50%', left: '50%', width: '300px', height: '200px' } }),
      transition('open => closed', [
        animate('800ms cubic-bezier(.68,-.55,.265,1.55)', style({
          position: 'fixed',
          top: '{{ top }}px',
          left: '{{ left }}px',
          width: '{{ width }}px',
          height: '{{ height }}px',
          borderRadius: '16px',
          transform: 'scale(0.95)',
          opacity: 0,
          overflow: 'hidden'
        }))
      ], { params: { top: '50%', left: '50%', width: '300px', height: '200px' } })
    ])
  ]
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
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