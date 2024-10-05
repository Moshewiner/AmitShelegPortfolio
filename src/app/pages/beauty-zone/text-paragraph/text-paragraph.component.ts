import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BreaklinePipe } from '../../../pipes/breakline.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-text-paragraph',
  templateUrl: './text-paragraph.component.html',
  styleUrls: ['./text-paragraph.component.scss', '../typography.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BreaklinePipe, NgIf]
})
export class TextParagraphComponent implements OnInit {
  @Input() public subHeadline!: string;
  @Input() public headline!: string; 
  @Input() public text!: string;
  constructor() { }

  ngOnInit() {
  }

}
