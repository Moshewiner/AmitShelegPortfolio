import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-ram-aderet',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent],
  templateUrl: './ram-aderet.component.html',
  styleUrl: './ram-aderet.component.scss'
})
export class RamAderetComponent {

  public project = {
    title: 'Ram Aderet Digital Platform',
    description: 'Ram Aderet comprehensive digital platform and user experience design.',
    heroImage: './../../assets/ram-aderet/hero.png',
    client: 'Ram Aderet',
    year: '2025',
    platform: 'Web & Mobile',
    introduction: {
      title: 'Introduction',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    content: {
      images: [
        './../../assets/ram-aderet/hero.png',
        './../../assets/ram-aderet/hero.png'
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
