import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TabletPlayerComponent } from '../tablet-player/tablet-player.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tablet-image-slider',
  templateUrl: './tablet-image-slider.component.html',
  styleUrls: ['./tablet-image-slider.component.scss'],
  standalone: true,
  imports: [TabletPlayerComponent, NgIf, NgFor]
})
export class TabletImageSliderComponent implements OnInit {

  @Input() images: string[] = [];
  private _selectedImageIndex: number = 0;

  get selectedImageIndex() {
    return this._selectedImageIndex;
  }
  set selectedImageIndex(value: number) {
    this._selectedImageIndex = value;
    this.OnSelectedImageIndexChange.next(value);
  }


  @Output() OnSelectedImageIndexChange: EventEmitter<number> = new EventEmitter<number>();
  ngOnInit(): void {

  }

  get selectedImage(): string {
    return this.images[this.selectedImageIndex];
  }

  next() {
    this.selectedImageIndex = (this.selectedImageIndex + 1) % this.images.length;
  }
  previous() {
    if (this.selectedImageIndex <= 0) {
      this.selectedImageIndex = this.images.length - 1;
    } else {
      this.selectedImageIndex--;
    }
    console.log(this.selectedImageIndex);
  }

  slideTo(i: number) {
    this.selectedImageIndex = i;
  }

  isSelected(i: number): boolean {
    return i == this.selectedImageIndex;
  }
}
