import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'navbar',
    '[class.expanded]': 'isExpanded'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public isExpanded = false;

  public openMenu(): void {
    this.isExpanded = true;
  }
  public closeMenu(): void {
    this.isExpanded = false;
  }
  public toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    // TODO: mobile support (disable this logic on mobile)
    let prevScrollpos = window.pageYOffset;
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        // @ts-ignore
        document.getElementsByClassName('navbar')[0].style.top = '0';
      } else {
        // @ts-ignore
        document.getElementsByClassName('navbar')[0].style.top = '-120px';
      }
      prevScrollpos = currentScrollPos;
    };
  }
}
