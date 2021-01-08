import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-beauty-zone',
  templateUrl: './beauty-zone.component.html',
  styleUrls: ['./beauty-zone.component.scss'],
})
export class BeautyZoneComponent implements OnInit {


  public texts: { [key: string]: string } = {
    introduction: `How many times have you run into a stunning makeup look and wished to know how to do it on your own? Or maybe find out what mascara did she use to get those outstanding lashes?

      Have you spent too much money and hours trying to get the desired look and finally got exhausted and unsatisfied from the result?

      Meet BeautyZone.`,
    userResearch: `The first part of the project was to conduct interviews with people from the beauty world, both content creator and content consumer. It allowed me to understand their needs and desires in order to identify the pain points they encounter.
      I learned from the interviews that in order to learn and discover the best products and techniques independently, they mainly use free platform such as Instagram, Pinterest and YouTube. If they wish to level up their makeup skills to become professionals, they have to sign up for paid courses.
      Sadly, It takes a long way to practice makeup or even just to master makeup as a hobby.`,
    colors: `The color pink, is thought to be a calming color associated with love, kindness, femininity, thoughtful and caring. Thats why I chose it to be my primary color - to empower woman and boost giving and receiving. Black is associated with power, strength, elegance, sophistication, and that is exactly what I want my app to represent.`,
    wireframes: `Once I was satisfied with the architecuture, I started to  work on the user interface itself. I started with a low  fidelty sketch to understand what works and what  doesn’t work, and then jumped and created more  detailed and accurate prototype that can be tested.`,
    marketResearch: `After understanding the users needs, I made a competitor and market research to see how other products tackled this problem or similar ones.
      I have explored many types of apps, from makeup apps to social medias such as instagram and pinterest, explored beauty e-commerce websites and apps with camera search.`,
    firstPersona: `Chloe is a freelance bridal & evening makeup artist.
She’s super passionate about it and loves to share her knowledge.
Chloe runs a YouTube channel of makeup tutorials and an Instagram account for posts & short videos.
Still, she feels frustrated when she has to use more than one platform to post all of her content. Also, she gets tons of questions and messages that she doesn’t have the time for.
`,
    informationArchitecture: `Based on the insights gained from the research, I defined the architecture of the app. This step helps me to validate my solution before jumping to visual wireframes.`,
  };

  public painPoints: { headline: string, text: string }[] = [
    {
      headline: 'Get to the point',
      text: `Boring and exhausting onboarding process, some irrelevant questions and prmission requests before understanding the app value`
    },
    {
      headline: 'Non-social apps',
      text: 'Beauty apps are not built on socialization. They are focused on personal usage and not on creating connections that will benefit all.'
    },
    {
      headline: 'Trying to solve too many problems',
      text: 'Apps that try to make a solution for too many problems often miss the most important parts. Also, they are more complex to use.'
    },
    {
      headline: 'Not based on interests',
      text: 'All social media are general, not focusing on a particular field. The beauty field and some other more seek to get their own platform.'
    }

  ];

  public wireframesDesignMenu: {
    selectedItem: "Onboarding"| "Explore Inspiration"| "Post Page"| "Shop Page" | "Products Identifier" | "Notification Page" | "My Profile",
    headline: '',
    text: ''
  } = {
    selectedItem: 'Onboarding',
    headline: '',
    text: ''
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  public setMenuItem(item:"Onboarding"| "Explore Inspiration"| "Post Page"| "Shop Page" | "Products Identifier" | "Notification Page" | "My Profile") {
    this.wireframesDesignMenu.selectedItem = item;
  }


  increase(x: number) {
    return x + 1;
  };

  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({behavior});
  }
}
