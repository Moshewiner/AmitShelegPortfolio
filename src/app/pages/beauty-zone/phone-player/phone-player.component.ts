import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-phone-player',
  templateUrl: './phone-player.component.html',
  styleUrls: ['./phone-player.component.scss'],
})
export class PhonePlayerComponent implements OnInit {
  @Input() videoSrc: string = "https://miro.medium.com/max/480/1*mI__FzE0a8M5-6hO_8OPkA.gif";

  public svgId: string = (Math.random() + 1).toString(36).substring(7);

  ngOnInit(): void {
  }
}
