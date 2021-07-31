import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-image-slider',
  templateUrl: './mobile-image-slider.component.html',
  styleUrls: ['./mobile-image-slider.component.scss'],
})
export class MobileImageSliderComponent implements OnInit {

  @Input() images: string[] = [];
  public selecteImageIndex: number = 0;

  ngOnInit(): void {

  }

  get selectedImage(): string {
    return this.images[this.selecteImageIndex];
  }

  next() {
    this.selecteImageIndex = (this.selecteImageIndex + 1) % this.images.length;
  }
  previous() {
    if (this.selecteImageIndex <= 0) {
      this.selecteImageIndex = this.images.length - 1;
    } else {
      this.selecteImageIndex--;
    }
    console.log(this.selecteImageIndex);
  }

  slideTo(i) {
    this.selecteImageIndex = i;
  }

  isSelected(i: number): boolean {
    return i == this.selecteImageIndex;
  }

}
