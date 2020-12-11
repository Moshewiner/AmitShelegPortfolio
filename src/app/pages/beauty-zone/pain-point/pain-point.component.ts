import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-pain-point',
  templateUrl: './pain-point.component.html',
  styleUrls: ['./pain-point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PainPointComponent implements OnInit {
  @Input() public subHeadline: string;
  @Input() public headline: string;
  @Input() public text: string;
  constructor() { }

  ngOnInit(): void {
  }

}
