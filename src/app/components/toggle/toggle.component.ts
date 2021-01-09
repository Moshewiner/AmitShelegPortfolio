import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  private isOn: boolean = false;
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public toggle() {
    this.isOn = !this.isOn;
    this.onToggle.emit(this.isOn);
  }

}
