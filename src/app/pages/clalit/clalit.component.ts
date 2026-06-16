import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';
import { getProject } from '../../data/projects';

@Component({
    selector: 'app-clalit',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './clalit.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './clalit.component.scss'
})
export class ClalitComponent {

  public project = getProject('/clalit')!;

  constructor() { }

  // Method to scroll to specific sections if needed
  public scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
