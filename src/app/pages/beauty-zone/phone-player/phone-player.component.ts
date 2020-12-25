import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-player',
  templateUrl: './phone-player.component.html',
  styleUrls: ['./phone-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhonePlayerComponent implements OnInit {
  @Input() videoSrc: string = "https://www.youtube.com/embed/A7ry4cx6HfY";
  
  ngOnInit(): void {
  }
}
