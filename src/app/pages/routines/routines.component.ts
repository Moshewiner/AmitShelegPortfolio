import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterModule } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';
import { getProject } from '../../data/projects';

@Component({
    selector: 'app-routines',
    imports: [RouterModule, BasePageComponent],
    templateUrl: './routines.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './routines.component.scss'
})
export class RoutinesComponent {

  project = getProject('/routines')!;

}
