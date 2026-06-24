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
  /** Optional badge overlay on the project image (top-left). */
  @Input() projectBadge: 'new' | 'confidential' | null = null;
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

  /** Confidential projects emphasize the badge instead of "Coming soon". */
  get isConfidential(): boolean {
    return this.projectBadge === 'confidential';
  }

  /**
   * On mobile there's no hover, so a tap toggles the reveal instead. On desktop
   * it's driven purely by :hover.
   */
  public comingSoonRevealed = false;
  public confidentialRevealed = false;

  private isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  onProjectClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    // Project not published yet: ignore navigation. On mobile, a tap reveals
    // (and toggles) the overlay since hover isn't available.
    if (this.comingSoon) {
      if (this.isMobile()) {
        if (this.isConfidential) {
          this.confidentialRevealed = !this.confidentialRevealed;
        } else {
          this.comingSoonRevealed = !this.comingSoonRevealed;
        }
      }
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
