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
    title: `Redesigning and Refining [El Al] Cargo's Website & App`,
    description: 'Transforming complex cargo processes into a clear, accessible digital journey for [El Al] Cargo’s global clients.',
    heroImage: '../../../assets/Cargo/wide.png',
    client: 'El Al Israel Airlines',
    duration: '8 Months',
    platform: 'Desktop, Mobile, Native Mobile App',
    introduction: `El Al Cargo specializes in transporting a wide variety of commercial shipments worldwide, offering unique, end-to-end solutions for every client. From airport pickup to final delivery, the service emphasizes safety, reliability, and a personal touch.<br /><br />My role involved leading the redesign of El Al Cargo’s website, along with creating a new native mobile app. Focusing on UX strategy, I improved key flows and crafted a clean, intuitive interface that follows the brand’s visual identity. The product was developed in-house through close collaboration between the design and development team, working directly with project managers and El Al Cargo’s stakeholders.`,
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
