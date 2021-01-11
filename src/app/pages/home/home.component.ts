import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public texts: { [key: string]: string } = {
    about: 'Since I can remember myself, I saw the beauty and art in all.\nFrom collecting crafts for my DIY projects as a child, to decorating cakes to details. That passion stayed with me still until today.After I served as a paralegal at the Military Advocate, I realized how much I need and want to create. That’s when I decided to sign up for UX | UI diploma at “Shenkar” to discover about my passion.Recently I graduated my UX | UI diploma, and now I know that I have found a career I am genuinely passionate about and can’t wait to face the next challenge. I\'m looking forward to meeting you',
    userResearch: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type pecimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.`,
    informationArchitecture: `Based on the insights gained from the research, I defined the architecture of the app. This step helps me to validate my solution before jumping to visual wireframes.`
  };

  public colors: { value: string, isDark: boolean, isShadow: boolean }[] = [
    {value: '#000000', isDark: true, isShadow: false},
    {value: '#366B6D', isDark: true, isShadow: false},
    {value: '#438689', isDark: true, isShadow: false},
    {value: '#51A1A4', isDark: false, isShadow: false},
    {value: '#76B9BC', isDark: false, isShadow: false},
    {value: '#9FCED0', isDark: false, isShadow: false},
    {value: '#C8E3E4', isDark: false, isShadow: false},
    {value: '#EDF2F2', isDark: false, isShadow: false},
    {value: '#FFFFFF', isDark: false, isShadow: true}
  ];


  increase(x: number) {
    return x + 1;
  }

  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({behavior});
  }

}
