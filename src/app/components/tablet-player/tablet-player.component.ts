import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tablet-player',
  templateUrl: './tablet-player.component.html',
  styleUrls: ['./tablet-player.component.scss'],
  standalone: true,
})
export class TabletPlayerComponent implements OnInit {
  @Input() videoSrc: string = "https://miro.medium.com/max/480/1*mI__FzE0a8M5-6hO_8OPkA.gif ";

  constructor() { }

  ngOnInit(): void {
  }

}
