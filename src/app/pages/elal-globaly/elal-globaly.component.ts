import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-elal-globaly',
  standalone: true,
  imports: [CommonModule, RouterModule, BasePageComponent],
  templateUrl: './elal-globaly.component.html',
  styleUrl: './elal-globaly.component.scss'
})
export class ElalGlobalyComponent {

  public project = {
    title: `Smarter Tools for El Al's Airport Operations`,
    description: `A global back-office platform that streamlines station management, simplifies daily workflows, and saves time and resources across El Al’s operations.`,
    heroImage: './../../assets/GlobaLY/wide.png',
    client: 'El Al Israel Airlines',
    duration: 'Two Years (ongoing)',
    platform: 'Native iOS App for iPad',
    introduction: `GlobalLY is a back-office application created to optimize the daily operations of El Al’s station managers across the globe. Designed as a single hub for flight operations, station information, crew assignments and more - the system replaces manual processes with a streamlined digital workflow.<br /><br />I led the project end-to-end, from mapping workflows and creating detailed wireframes, to delivering a production-ready product design. The interface was crafted in line with El Al’s brand guidelines, ensuring visual consistency across the company’s digital ecosystem. Throughout the process, I collaborated closely with project managers, system analysts, and the development team, while testing early prototypes directly with field managers.<br /><br />One of the key challenges was designing for non-technical users who primarily access the system on tablets, often in time-sensitive environments. By prioritizing clarity and accessibility, I ensured that even complex tasks could be performed in just a few taps.<br /><br />The outcome is a fully deployed solution, now used daily by El Al station managers worldwide. In pilot-phase interviews, station managers highlighted the system’s simplicity and efficiency.Most importantly, GlobalLY saves each station manager more than 10 hours of manual work every week - optimizing time and costs across El Al’s global operations.`,
    content: {
      images: [
        './../../assets/elal-globaly/hero.png',
        './../../assets/elal-globaly/hero.png'
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
