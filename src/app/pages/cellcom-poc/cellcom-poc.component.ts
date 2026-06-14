import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
    selector: 'app-cellcom-poc',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './cellcom-poc.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './cellcom-poc.component.scss'
})
export class CellcomPocComponent {

  public project = {
    title: 'Cellcom POC Digital Platform',
    description: 'Cellcom Proof of Concept for next-generation telecommunications platform.',
    heroImage: './../../assets/cellcom-poc/hero.png',
    client: 'Cellcom',
    duration: '2 months',
    platform: 'Web & Mobile',
    introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    content: {
      images: [
        './../../assets/cellcom-poc/hero.png',
        './../../assets/cellcom-poc/hero.png'
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
