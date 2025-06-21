import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-gov-shahaf',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent],
  templateUrl: './gov-shahaf.component.html',
  styleUrl: './gov-shahaf.component.scss'
})
export class GovShahafComponent {

  public project = {
    title: 'Government Shahaf Digital Platform',
    description: 'Shahaf government services digital transformation and user experience enhancement.',
    heroImage: './../../assets/gov-shahaf/hero.png',
    client: 'Government Shahaf',
    year: '2025',
    platform: 'Web & Mobile',
    introduction: {
      title: 'Introduction',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    content: {
      images: [
        './../../assets/gov-shahaf/hero.png',
        './../../assets/gov-shahaf/hero.png'
      ]
    }
  };

  constructor() { }

  // Method to scroll to specific sections if needed
  public scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
