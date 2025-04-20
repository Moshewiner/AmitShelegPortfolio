import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
}
