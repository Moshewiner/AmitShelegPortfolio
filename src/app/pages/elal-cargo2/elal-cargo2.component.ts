import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-elal-cargo2',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './elal-cargo2.component.html',
  styleUrl: './elal-cargo2.component.scss'
})
export class ElatCargo2Component {

  @Input() project = {
    title: 'Redesigning and Refining the El Al Cargo Website',
    description: 'Elal Cargo is a leading provider of cargo services in the Middle East.',
    heroImage: './../../assets/elal-cargo/hero.png',
    client: 'Elal Cargo',
    year: '2025',
    platform: 'Web',
    introduction: {
      title: 'Introduction',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    content: {
      images: [
        './../../assets/elal-cargo/hero.png',
        './../../assets/elal-cargo/hero.png'
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
