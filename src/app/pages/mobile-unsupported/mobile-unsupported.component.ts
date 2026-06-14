import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mobile-unsupported',
  templateUrl: './mobile-unsupported.component.html',
  styleUrls: ['./mobile-unsupported.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class MobileUnsupportedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
