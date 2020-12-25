import { Component, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AmitSheleg';
  // private screens: any;
  // private pos = 0;
  
  // private next() {
  //   this.pos++;
  //   const e = this.screens[this.pos];
  //   e.scrollIntoView();
  // }
  // private previous() {
  //   this.pos--;
  //   const e = this.screens[this.pos];
  //   e.scrollIntoView();
  // }
  // private oldValue: number = 0;

  // constructor(@Inject(DOCUMENT) private _document: HTMLDocument) {}
  //   ngOnInit() {
  //   this.screens = this._document.querySelectorAll('.screen');
  //   console.log({screens: this.screens});
  //   window.addEventListener('scroll', (e) => {
  //     const newValue = window.pageYOffset;
 
  //     if (this.oldValue - newValue < 0) {
  //       this.next();
  //     } else if (this.oldValue - newValue > 0) {
  //       this.previous();
  //     }
  //     this.oldValue = newValue;
  //   });

  // }
}
