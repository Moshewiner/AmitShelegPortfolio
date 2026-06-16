import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';
import { getProject } from '../../data/projects';

@Component({
    selector: 'app-elal-cargo',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './elal-cargo.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './elal-cargo.component.scss'
})
export class ElalCargoComponent {

  project = getProject('/elal-cargo')!;

  constructor() { }

  // Method to scroll to specific sections if needed
  public scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
