import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-paragraph',
  templateUrl: './text-paragraph.component.html',
  styleUrls: ['./text-paragraph.component.scss', '../typography.scss']
})
export class TextParagraphComponent implements OnInit {
  @Input() public subHeadline: string;
  @Input() public headline: string;
  @Input() public text: string;
  constructor() { }

  ngOnInit() {
    console.log("TextParagraphComponent init!!");
  }

}
