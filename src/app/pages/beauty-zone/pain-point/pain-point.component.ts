import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BreaklinePipe } from '../../../pipes/breakline.pipe';

@Component({
  selector: 'app-pain-point',
  templateUrl: './pain-point.component.html',
  styleUrls: ['./pain-point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BreaklinePipe]
})
export class PainPointComponent implements OnInit {
  @Input() public subHeadline!: string;
  @Input() public headline!: string;
  @Input() public text!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
