import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss'
})
export class ProjectItemComponent {
  @Input() projectName: string = '';
  @Input() projectImage: string = '';
  @Input() projectLink: string = '';
  @Input() title: string = '';
  
  @Output() projectClick = new EventEmitter<{link: string, rect: DOMRect}>();

  @ViewChild('projectElement') projectElement!: ElementRef;

  public isAnimating = false;

  constructor(private router: Router) {}

  private isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  onProjectClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.isMobile() && this.projectElement) {
      // Add visual feedback
      this.isAnimating = true;
      
      const rect = this.projectElement.nativeElement.getBoundingClientRect();
      this.projectClick.emit({link: this.projectLink, rect});
      
      // Reset animation state after a delay
      setTimeout(() => {
        this.isAnimating = false;
      }, 2200);
    } else {
      // Use Angular Router for proper navigation on desktop
      this.router.navigate([this.projectLink]);
    }
  }
}
