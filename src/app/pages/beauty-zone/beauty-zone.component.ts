import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beauty-zone',
  templateUrl: './beauty-zone.component.html',
  styleUrls: ['./beauty-zone.component.scss']
})
export class BeautyZoneComponent implements OnInit {


    public texts: {[key: string]: string} = {
      introduction: `How many times have you run into a stunning makeup look and wished to know how to do it on your own? Or maybe find out what mascara did she use to get those outstanding lashes?

      Have you spent too much money and hours trying to get the desired look and finally got exhausted and unsatisfied from the result?
      
      Meet BeautyZone.`
    };

  constructor() { }

  ngOnInit(): void {
  }




  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({ behavior });
  }
}
