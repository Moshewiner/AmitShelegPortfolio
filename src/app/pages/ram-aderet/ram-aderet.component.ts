import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TextParagraphComponent } from '../beauty-zone/text-paragraph/text-paragraph.component';
import { TabletImageSliderComponent } from '../../components/tablet-image-slider/tablet-image-slider.component';
import { MobileImageSliderComponent } from '../../components/mobile-image-slider/mobile-image-slider.component';

@Component({
  selector: 'app-ram-aderet',
  templateUrl: './ram-aderet.component.html',
  styleUrls: ['./ram-aderet.component.scss'],
  standalone: true,
  imports: [TextParagraphComponent, TabletImageSliderComponent, MobileImageSliderComponent, RouterLink]
})
export class RamAderetComponent implements OnInit {

  public route = '/ram-aderet';

  public texts: { [key: string]: string } = {
    aboutHeadline: 'About the Project',
    about: 'I led the design of an internal system for Ram Aderet, tailored to non-technical and old-fashioned users in the construction industry. The main goal was to replace outdated paper-based processes with an intuitive digital solution. I focused on simplifying complex data and forms to make the system accessible to all, regardless of tech experience. This resulted in a seamless platform that worked across desktops, tablets, and smartphones, streamlining project management and improving accessibility.'
  };


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
