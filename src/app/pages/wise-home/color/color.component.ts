import { NgClass, NgStyle } from '@angular/common';
import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle, NgClass]
})
export class ColorComponent implements OnInit {
  @Input() isDark = false;
  @Input() color!: string;
  @Input() isShadow!: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
