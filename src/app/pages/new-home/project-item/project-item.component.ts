import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { NoBreakPipe } from '../../../pipes/no-break.pipe';

@Component({
    selector: 'app-project-item',
    imports: [RouterModule, NoBreakPipe],
    templateUrl: './project-item.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './project-item.component.scss'
})
export class ProjectItemComponent {
  @Input() projectName: string = '';
  @Input() projectImage: string = '';
  @Input() projectLink: string = '';
  @Input() title: string = '';
  /**
   * Whether this card is the one currently open in the mobile modal. Driven by
   * the parent off the modal open/close state, so the pressed/dimmed look is
   * cleared deterministically on close (never a leftover blur).
   */
  @Input() active = false;
  
  @Output() projectClick = new EventEmitter<{link: string, rect: DOMRect}>();

  @ViewChild('projectElement') projectElement!: ElementRef;

  constructor(private router: Router) {}

  /**
   * A project with no link is still in development / not published yet. We use
   * this to show a "Coming soon" overlay and to disable navigation.
   */
  get comingSoon(): boolean {
    return !this.projectLink || this.projectLink.trim() === '';
  }

  private isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  onProjectClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    // Project not published yet: ignore clicks, the overlay explains why.
    if (this.comingSoon) {
      return;
    }
    
    if (this.isMobile() && this.projectElement) {
      // Mobile: emit the cover IMAGE rect so the home page can morph it into
      // the project page hero. The parent flips `active` for the pressed look.
      const imageEl = this.projectElement.nativeElement.querySelector('.project-image') as HTMLElement | null;
      const rect = (imageEl ?? this.projectElement.nativeElement).getBoundingClientRect();
      this.projectClick.emit({link: this.projectLink, rect});
    } else {
      // Desktop: navigate normally via the Router (no shared-element morph).
      this.router.navigate([this.projectLink]);
    }
  }
}
