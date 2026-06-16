import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
    selector: 'app-elal-cargo',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './elal-cargo.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './elal-cargo.component.scss'
})
export class ElalCargoComponent {

  project = {
    title: `Redesigning and Refining [El Al] Cargo's Website & App`,
    description: 'Transforming complex cargo processes into a clear, accessible digital journey for [El Al] Cargo’s global clients.',
    heroImage: '../../../assets/Cargo/wide.webp',
    client: 'El Al Israel Airlines',
    duration: '8 Months',
    platform: 'Desktop, Mobile, Native Mobile App',
    introduction: `El Al Cargo specializes in transporting a wide variety of commercial shipments worldwide, offering unique, end-to-end solutions for every client. From airport pickup to final delivery, the service emphasizes safety, reliability, and a personal touch.<br /><br />My role involved leading the redesign of El Al Cargo’s website, along with creating a new native mobile app. Focusing on UX strategy, I improved key flows and crafted a clean, intuitive interface that follows the brand’s visual identity. The product was developed in-house through close collaboration between the design and development team, working directly with project managers and El Al Cargo’s stakeholders.`,
    content: {
      images: [
        '../../../assets/Cargo/01HP.webp',
        '../../../assets/Cargo/02SR.webp',
        '../../../assets/Cargo/03HP-BA.webp',
        '../../../assets/Cargo/04FS-BA.webp',
        '../../../assets/Cargo/05CP.webp',
        '../../../assets/Cargo/06BI.webp',
        '../../../assets/Cargo/07DS.webp',
        '../../../assets/Cargo/08Web.webp',
        '../../../assets/Cargo/09App.webp'
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
