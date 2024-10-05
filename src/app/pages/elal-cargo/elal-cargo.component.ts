import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {MenuItems} from './interfaces';
import { TextParagraphComponent } from '../beauty-zone/text-paragraph/text-paragraph.component';
import { TabletImageSliderComponent } from '../../components/tablet-image-slider/tablet-image-slider.component';
import { MobileImageSliderComponent } from '../../components/mobile-image-slider/mobile-image-slider.component';

@Component({
  selector: 'app-elal-cargo',
  templateUrl: './elal-cargo.component.html',
  styleUrls: ['./elal-cargo.component.scss'],
  standalone: true,
  imports: [TextParagraphComponent, TabletImageSliderComponent, MobileImageSliderComponent, RouterLink]
})
export class ElalCargoComponent implements OnInit {

  public route = '/addict';

  public texts: { [key: string]: string } = {
    aboutHeadline: 'About the Project',
    about: 'I refactored El Al Cargo’s website and designed a new mobile app to enhance the user experience. The current website was outdated, so I focused on making the site and app more modern and user-friendly. The new designs are fully aligned with El Al’s style guide, ensuring a consistent look and feel across all digital platforms. Now, the website is fully responsive, supporting both desktop and mobile displays, alongside the native mobile app. This redesign provided a unified and intuitive experience for all users, making it easier to navigate and access information, while putting the main services upfront to encourage more sales.'
  };


  public colorsImages: string[] = [
    "/assets/addict/mobile/Colors/Sweatshirt%201.png",
    "/assets/addict/mobile/Colors/Sweatshirt%202.png",
    "/assets/addict/mobile/Colors/Sweatshirt%203.png",
    "/assets/addict/mobile/Colors/Sweatshirt%204.png",
    "/assets/addict/mobile/Colors/Sweatshirt%205.png",
  ];


  public scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({behavior});
  }

  private isNotDesktopDevice = false;
  constructor(private deviceService: DeviceDetectorService, private router: Router) {
    this.isNotDesktopDevice = !this.deviceService.isDesktop();
  }

  ngOnInit() {
    if(this.isNotDesktopDevice) {
      // this.router.navigateByUrl('/mobile-unsupported');
    }
  }
}
