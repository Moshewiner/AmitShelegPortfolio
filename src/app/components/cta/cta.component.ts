import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
    selector: 'app-cta',
    templateUrl: './cta.component.html',
    styleUrl: './cta.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, RevealOnScrollDirective]
})
export class CtaComponent {
  @Input() title = 'Made it this far?';
  @Input() subtitle = 'Imagine what we will create together.';
  @Input() buttonText = 'Get In Touch';
  @Input() buttonLink = '/contact';
}
