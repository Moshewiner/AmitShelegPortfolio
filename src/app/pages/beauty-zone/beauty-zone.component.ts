import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beauty-zone',
  templateUrl: './beauty-zone.component.html',
  styleUrls: ['./beauty-zone.component.scss']
})
export class BeautyZoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scroll(e: HTMLElement) {
    e.scrollIntoView({behavior:'smooth'});
  }

}
