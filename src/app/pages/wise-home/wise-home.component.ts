import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-wise-home',
  templateUrl: './wise-home.component.html',
  styleUrls: ['./wise-home.component.scss'],
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

  public userResearchDetails = {
    first: {
      headline: 'Be the one',
      text: "Users can't manage too many applications - a single app can handle it all."
    },
    second: {
      headline: 'Keep it simple',
      text: 'Each common functions should be easy to access, whether for kids or adults.'
    },
    third: {
      headline: 'Sharing is caring',
      text: 'Home appliances need to be shared across the family members.'
    },
    fourth: {
      headline: 'Manual out, auto in',
      text: 'Most of the common usages are actually can be triggered automatically.'
    },
  };

  public persona = {
    first: {
      headline: '“Smart devices for my home will make my life easier and comfortable.”',
      text: 'Michael is a student that works as a salesman in a local electric store.\n' +
        'At the store, he first found out about the smart lights and got himself one.\n' +
        'Since then, he was intrigued by smart devices, so he bought smart lights, speakers, and a thermostat.\n' +
        'He was upset when he found out that every device requires its own app, and every app is looking so different from others.'
    },
    second: {
      headline: '“I wish the smart devices in my home would integrate with a single app and be easier to use.”',
      text: 'James, a 30 years old electrical engineer, that tech is a big part of his life. His goal is to make his home super autonomous, so he bought almost every device in his house - smart.\n' +
        'He started to modify all the apps and made routines, but the integration between all the devices was nearly impossible. \n' +
        'His devices were unfortunately useless, and although they are smart - the usage of them is not.'
    }
  }

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
