import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';
import { getProject } from '../../data/projects';

@Component({
    selector: 'app-elal-globaly',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './elal-globaly.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './elal-globaly.component.scss'
})
export class ElalGlobalyComponent {

  public project = getProject('/elal-globaly')!;

  constructor() { }

  // Method to scroll to specific sections if needed
  public scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
