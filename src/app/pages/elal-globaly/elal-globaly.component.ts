import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TextParagraphComponent } from '../beauty-zone/text-paragraph/text-paragraph.component';
import { TabletImageSliderComponent } from '../../components/tablet-image-slider/tablet-image-slider.component';
import { MobileImageSliderComponent } from '../../components/mobile-image-slider/mobile-image-slider.component';

@Component({
  selector: 'app-elal-globaly',
  templateUrl: './elal-globaly.component.html',
  styleUrls: ['./elal-globaly.component.scss'],
  standalone: true,
  imports: [TextParagraphComponent, TabletImageSliderComponent, MobileImageSliderComponent, RouterLink]
})
export class ElalGlobalyComponent implements OnInit {

  public route = '/elal-globaly';

  public texts: { [key: string]: string } = {
    aboutHeadline: 'About the Project',
    about: 'An internal tablet app for El Al’s airport station managers worldwide. The app is designed to assist station managers with their daily operations, streamline tasks, improve efficiency, and reduce costs. This app integrates multiple modules to support various logistical needs, such as flight schedules, station information, crew management, and more. The design process included developing high-fidelity wireframes to ensure a user-friendly experience, even for non-technical users. The result was a unified and effective solution that enhanced workflow and communication at airport stations.'
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
