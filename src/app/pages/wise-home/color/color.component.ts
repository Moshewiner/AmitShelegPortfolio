import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent implements OnInit {
  @Input() isDark: boolean = false;
  @Input() color: string;
  constructor() { }

  ngOnInit(): void {
  }

}
