import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'navbar',
    '[class.expanded]': 'isExpanded'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public isExpanded: boolean = false;

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
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        //@ts-ignore
        document.getElementsByClassName("navbar")[0].style.top = "0";
      } else {
        //@ts-ignore
        document.getElementsByClassName("navbar")[0].style.top = "-120px";
      }
      prevScrollpos = currentScrollPos;
    }
  }
}
