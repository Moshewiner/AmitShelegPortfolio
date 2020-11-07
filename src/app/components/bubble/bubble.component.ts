import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent {
  @Input() text;
  @Input() direction = "ltr";
}
