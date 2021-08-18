import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-colors-slider',
  templateUrl: './colors-slider.component.html',
  styleUrls: ['./colors-slider.component.scss']
})
export class ColorsSliderComponent implements OnInit {

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

}
