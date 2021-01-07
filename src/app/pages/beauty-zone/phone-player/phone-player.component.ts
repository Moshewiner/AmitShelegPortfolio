import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-player',
  templateUrl: './phone-player.component.html',
  styleUrls: ['./phone-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhonePlayerComponent implements OnInit {
  // @Input() videoSrc: string = "https://media.giphy.com/media/VRhsYYBw8AE36/giphy.gif";

  @Input() videoSrc: string = "https://store-images.s-microsoft.com/image/apps.44424.13946487343453322.7f94d75c-3c41-4a61-93d9-41aed210dea3.7e33abda-0ccc-42b1-aaab-3832e08bb141?mode=scale&q=90&h=720&w=1280";
  ngOnInit(): void {
  }
}
