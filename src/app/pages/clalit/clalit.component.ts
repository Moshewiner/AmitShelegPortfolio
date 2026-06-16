import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
    selector: 'app-clalit',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './clalit.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './clalit.component.scss'
})
export class ClalitComponent {

  public project = {
    title: `Enhancing Clalit's Workshop Registration Experience`,
    description: 'Adapting Clalit’s workshop registration into a seamless mobile experience.',
    heroImage: './../../assets/Clalit/wide.webp',
    client: 'Clalit Health Services',
    duration: 'One Month',
    platform: 'Mobile Adaptation',
    introduction: `Clalit Health Services launched a new website to improve services for its customers. <br />
The purpose of the website is to enable registration for health-improvement workshops, both in-person and online.<br /><br /> 

The project was done in collaboration with a fellow designer from my team, and my role was to adapt the desktop design into a fully responsive mobile version. The site is now live and serves Clalit’s customers with a smooth and accessible registration experience across devices.`,
    content: {
      images: [
        './../../assets/clalit/hero.png',
        './../../assets/clalit/hero.png'
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
