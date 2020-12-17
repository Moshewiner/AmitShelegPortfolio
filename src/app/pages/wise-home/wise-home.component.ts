import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wise-home',
  templateUrl: './wise-home.component.html',
  styleUrls: ['./wise-home.component.scss']
})
export class WiseHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  increase(x: number) { return x + 1 };

  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({ behavior });
  }

}
