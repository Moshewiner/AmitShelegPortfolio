import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  standalone: true,
})
export class BubbleComponent {
  @Input() text: any;
  @Input() direction = "ltr";
}
