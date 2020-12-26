import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wise-home',
  templateUrl: './wise-home.component.html',
  styleUrls: ['./wise-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WiseHomeComponent {

  public texts: { [key: string]: string } = {
    introduction: `How many times have you run into a stunning makeup look and wished to know how to do it on your own? Or maybe find out what mascara did she use to get those outstanding lashes?

      Have you spent too much money and hours trying to get the desired look and finally got exhausted and unsatisfied from the result?
      
      Meet BeautyZone.`,
    userResearch: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type pecimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.`,
    informationArchitecture: `Based on the insights gained from the research, I defined the architecture of the app. This step helps me to validate my solution before jumping to visual wireframes.`
  };

  public colors: { value: string, isDark: boolean }[] = [
    { value: "#000000", isDark: true },
    { value: "#366B6D", isDark: true },
    { value: "#438689", isDark: true },
    { "value": "#51A1A4", "isDark": false },
    { "value": "#76B9BC", "isDark": false },
    { "value": "#9FCED0", "isDark": false },
    { "value": "C8E3E4", "isDark": false },
    { "value": "#EDF2F2", "isDark": false },
    { "value": "#FFFFFF", "isDark": false }
  ];


  increase(x: number) { return x + 1 };

  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({ behavior });
  }

}
