import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-gov-onboarding',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent],
  templateUrl: './gov-onboarding.component.html',
  styleUrl: './gov-onboarding.component.scss'
})
export class GovOnboardingComponent {

  public project = {
    title: 'Government Services Digital Onboarding',
    description: 'Streamlining government services through digital onboarding and user experience design.',
    heroImage: './../../assets/gov-onboarding/hero.png',
    client: 'Government Services',
    year: '2025',
    platform: 'Web & Mobile',
    introduction: {
      title: 'Introduction',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    content: {
      images: [
        './../../assets/gov-onboarding/hero.png',
        './../../assets/gov-onboarding/hero.png'
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
