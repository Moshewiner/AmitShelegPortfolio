import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
    selector: 'app-gov-shahaf',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './gov-shahaf.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gov-shahaf.component.scss'
})
export class GovShahafComponent {

  public project = {
    title: 'Simplifying Freedom of Information (FOI) Requests Management',
    description: 'Creating a simple and efficient system for public authorities to manage FOI requests through a focused, digital-first approach.',
    heroImage: './../../assets/Shahaf-gov/shahaf-wide.png',
    client: 'Gov.il - National Digital Agency',
    duration: '8 Months (ongoing)',
    platform: 'Desktop',
    introduction: `Shahaf is a BackOffice system designed to manage Freedom of Information (FOI) requests across public authorities.
                  <br /><br />
                  The system allows users to receive, enter, and manage requests - including cost calculations, documentation management, decision-making, coordination with third party consultants, as well as with the requesters themselves.
                  <br /><br />
                  Shahaf digitizes the FOI process, making it faster, transparent, and more efficient - enabling public sector organizations to improve oversight, service, and daily operations.
`,
    content: {
      images: [
        '../../../assets/Shahaf-gov/01MT.png',
        '../../../assets/Shahaf-gov/02BC.png',
        '../../../assets/Shahaf-gov/03BD.png',
        '../../../assets/Shahaf-gov/04BF.png',
        '../../../assets/Shahaf-gov/05DB.png',
        '../../../assets/Shahaf-gov/06CM.png',
        '../../../assets/Shahaf-gov/07Web.png',
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
