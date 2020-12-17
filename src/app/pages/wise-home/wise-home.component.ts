import { Component } from '@angular/core';

@Component({
  selector: 'app-wise-home',
  templateUrl: './wise-home.component.html',
  styleUrls: ['./wise-home.component.scss']
})
export class WiseHomeComponent {

  public texts: { [key: string]: string } = {
    introduction: `How many times have you run into a stunning makeup look and wished to know how to do it on your own? Or maybe find out what mascara did she use to get those outstanding lashes?

      Have you spent too much money and hours trying to get the desired look and finally got exhausted and unsatisfied from the result?
      
      Meet BeautyZone.`,
      userResearch: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type pecimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.`,
      informationArchitecture: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type pecimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets`
  };

  increase(x: number) { return x + 1 };

  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({ behavior });
  }

}
