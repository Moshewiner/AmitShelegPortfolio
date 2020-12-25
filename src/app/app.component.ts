import { Component, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AmitSheleg';
  private screens: any;
  private isScrolling = false;

  constructor(@Inject(DOCUMENT) private _document: HTMLDocument) {}

  ngOnInit() {
    setTimeout(() => {}, 400);
    window.addEventListener('wheel', (e) => {
      if (!this.isScrolling) {
        this.isScrolling = true;
        this.screens = this._document.querySelectorAll('.screen');
        const howFarFromTop = $(document).scrollTop(); //how far from the top have we scrolled?
        const currentWindowHeight = $(window).height(); //current window height for responsiveness
        const delta = e.deltaY; // just to know if it is scroll wheel up or down
        //find out what is our offset from the top so we can now how far do we have to scroll to  the next / previous element
        var currentSlide = Math.floor(howFarFromTop / currentWindowHeight); //approximate which slide is on screen at the moment

        if (delta > 0) {
          //
        } else {
          //
        }
        setTimeout(() => {
          this.isScrolling = false;
        }, 400);
      }
    });
  }
}
