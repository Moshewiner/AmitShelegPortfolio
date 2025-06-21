import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-applied-materials',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent],
  templateUrl: './applied-materials.component.html',
  styleUrl: './applied-materials.component.scss'
})
export class AppliedMaterialsComponent {

  public project = {
    title: 'Applied Materials Digital Platform',
    description: 'Applied Materials comprehensive digital platform for semiconductor manufacturing solutions.',
    heroImage: './../../assets/applied-materials/hero.png',
    client: 'Applied Materials',
    duration: '10 months',
    platform: 'Web & Mobile',
    introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    content: {
      images: [
        './../../assets/applied-materials/hero.png',
        './../../assets/applied-materials/hero.png'
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
