import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';
import { getProject } from '../../data/projects';

@Component({
    selector: 'app-gov-shahaf',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './gov-shahaf.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './gov-shahaf.component.scss'
})
export class GovShahafComponent {

  public project = getProject('/gov-shahaf')!;

  constructor() { }

  // Method to scroll to specific sections if needed
  public scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
