import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-elal-cargo',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent],
  templateUrl: './elal-cargo.component.html',
  styleUrl: './elal-cargo.component.scss'
})
export class ElalCargoComponent {

  project = {
    title: 'Redesigning and Refining the [El Al] Cargo Website',
    description: 'A full redesign of [El Al’s] cargo website to create a smarter, faster, and more user-friendly shipping experience.',
    heroImage: '../../../assets/Cargo/wide.png',
    client: 'El Al Israel Airlines',
    duration: '8 Months',
    platform: 'Desktop, Mobile, Native Mobile App',
    introduction: 'El Al’s cargo division needed a modern, responsive website to serve business and individual customers with clear booking flows and trustworthy design. I was responsible for the full UX/UI process—research, wireframing, and prototyping. I simplified complex cargo services into clean user journeys, designed responsive interfaces for desktop and mobile, and built a flexible design system aligned with El Al’s brand language.',
    content: {
      images: [
        '../../../assets/Cargo/preview.png',
        '../../../assets/Cargo/wide.png'
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
