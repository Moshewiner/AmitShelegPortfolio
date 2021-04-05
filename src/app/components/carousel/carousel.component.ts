import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgxGlideComponent} from 'ngx-glide';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() images: string[];
  @Input() backwardArrowImage: string;
  @Input() forwardArrowImage: string;


  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;



  constructor() {

  }

  ngOnInit(): void {

  }

  public forward(): void {
    this.ngxGlide.go('>');
  }
  public backward(): void {
    this.ngxGlide.go('<');
  }

}
