import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-wise-home',
  templateUrl: './wise-home.component.html',
  styleUrls: ['./wise-home.component.scss'],
})
export class WiseHomeComponent {

  public texts: { [key: string]: string } = {
    introduction: "In today's technological and advanced era, we enjoy a multitude of smart devices. Those devices improve the quality of our lives and make them easier, safer, and more comfortable.\n\nOur goal is to enable smart and efficient management for our devices which will provide us controlling tools, and real-time monitoring for everyone, everywhere.",
    userResearch: "The first step was to go out and speak to users to recognize their pain points. After interviewing a few users, I also read user reviews of known smart home apps.\n\nThe main issue the users pointed at is that there's a specific app for each device's company, which leads to having too many apps to manage all smart devices in their homes.\nThere were also significant complaints regarding the user interface and interaction elements - most dashboard designs were complex and overwhelming for the users.",
    informationArchitecture: "Based on the insights gained from the research, I defined the architecture of the app. This step helps me to validate my solution before jumping to visual wireframes.",
    phoneDesign: "The final step was to design user interfaces for mobile and tablet apps. I aimed for a clean design that will focus the user on the main highlights, so I used white-on-white cards and accents them with teal color.\n\n Routines are running automatically, and updates will be trigger push notifications to help the user live with a little fewer concerns about his home.",
    colors: 'Teal combines the calming properties of blue with the renewal qualities of green. It is a revitalizing and rejuvenating color that symbolizes idealism, calmness, communication, clarity of thought, balance, and harmony.',
    wireframes: "At the point I was satisfied with the architecture, I started to work on the user interface. I started with a low fidelity sketch to understand what works and what doesn’t work, and then jumped and created more detailed and accurate wireframes."
  };

  public userResearchDetails = {
    first: {
      headline: 'Be the one',
      text: "Users can't manage too many applications - a single app can handle it all."
    },
    second: {
      headline: 'Keep it simple',
      text: 'Each common function should be easy to access, whether for kids or adults.'
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
