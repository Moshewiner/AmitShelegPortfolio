import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MenuItems} from './interfaces';

@Component({
  selector: 'app-addict',
  templateUrl: './addict.component.html',
  styleUrls: ['./addict.component.scss'],
})
export class AddictComponent implements OnInit {

  public route = '/addict';

  public texts: { [key: string]: string } = {
    introduction: `How many times have you run into a stunning makeup look and wished to know how to do it on your own? Or maybe find out what mascara did she use to get those outstanding lashes?

      Have you spent too much money and hours trying to get the desired look and finally got exhausted and unsatisfied from the result?

      Meet BeautyZone.`,
    userResearch: `The first part of the project was to conduct interviews with people from the beauty world, both content creators and content consumers.\nIt allowed me to understand their needs and desires to identify the pain points they encounter.

I learned from the interviews that to learn and discover the best products and techniques independently, they mainly use a free platform such as Instagram, Pinterest and YouTube. If they wish to level up their makeup skills to become professionals, they have to sign up for paid courses.

Sadly, It takes a long way to practice makeup or even just to master makeup as a hobby.`,
    colors: `The color pink, is thought to be a calming color associated with love, kindness, femininity, thoughtful and caring.\nThat's why I chose it to be my primary color - to empower woman and boost giving and receiving. Black is associated with power, strength, elegance, sophistication, and that is exactly what I want my app to represent.`,
    wireframes: `Once I was satisfied with the architecuture, I started to  work on the user interface itself. I started with a low  fidelty sketch to understand what works and what  doesn’t work, and then jumped and created more  detailed and accurate prototype that can be tested.`,
    marketResearch: 'After understanding the user\'s needs, I conducted competitor research and market research to see how other products tackled those problems or similar ones. \nI have explored many types of apps, from makeup apps to social media apps, explored beauty e-commerce websites and apps with camera search. ',
    firstPersona: 'Chloe is a freelance bridal & evening makeup artist.\nShe’s super passionate about it and loves to share her knowledge. Chloe runs a YouTube channel of makeup tutorials and an Instagram account for posts & short videos.\nStill, she feels frustrated when she has to use more than one platform to post all of her content. Also, she gets tons of questions and messages that she doesn’t have the time for.',
    secondPersona: 'Lisa is a third-year law student with a great passion for makeup.\nEvery day she checks her social media accounts to get inspired and learn new techniques.\nLast year, she looked for a beginners makeup course and sadly, it’s only in central cities and also she couldn’t afford it.\nSince then, she couldn’t find a way to work up her hobby and had to give up on it.',
    informationArchitecture: `Based on the insights gained from the research, I defined the architecture of the app. This step helps me to validate my solution before jumping to visual wireframes.`,
    inspirations: `I was inspired by soft natural colors and vintage style when I designed the e-commerce. I thought of how order can give a calm and elegant feel to the user.`
  };

  public painPoints: { headline: string, text: string }[] = [
    {
      headline: 'Get to the point',
      text: `Boring and exhausting onboarding process, some irrelevant questions and permission requests before understanding the app value.`
    },
    {
      headline: 'Non-social apps',
      text: 'Beauty apps are not built on socialization. They are focused on personal usage and not on creating connections that will benefit all.'
    },
    {
      // headline: 'Trying to solve too many problems',
      headline: 'Trying xxx',
      text: 'Apps that try to make a solution for too many problems often miss the most important parts. Also, they are more complex to use.'
    },
    {
      headline: 'Not based on interests',
      text: 'All social media are general, not focusing on a particular field.\nThe beauty field and some other more seek to get their own platform.'
    }

  ];

  public isUI = false;
  private imageTextUrls: Record<MenuItems, string> = {
    Onboarding: '/assets/beauty-zone/11 - Phone mockup wd/texts/Onboarding text.svg',
    'Home Page': '/assets/beauty-zone/11 - Phone mockup wd/texts/Home page text.svg',
    'Shop Page': '/assets/beauty-zone/11 - Phone mockup wd/texts/Shop page text.svg',
    'Products Identifier': '/assets/beauty-zone/11 - Phone mockup wd/texts/Product identifier text.svg',
    'My Profile': '/assets/beauty-zone/11 - Phone mockup wd/texts/My Profile text.svg'
  };


  private uiImageVideoUrls: Record<MenuItems, string> = {
    Onboarding: '/assets/beauty-zone/11 - Phone mockup wd/Gif UI/Onboarding gif ui.gif',
    'Home Page': '/assets/beauty-zone/11 - Phone mockup wd/Gif UI/Homepage gif ui.gif',
    'Shop Page': '/assets/beauty-zone/11 - Phone mockup wd/Gif UI/Shop page gif ui.gif',
    'Products Identifier': '/assets/beauty-zone/11 - Phone mockup wd/Gif UI/Product identifier gif ui.gif',
    'My Profile': '/assets/beauty-zone/11 - Phone mockup wd/Gif UI/My profile gif ui.gif'
  };

  private uxImageVideoUrls: Record<MenuItems, string> = {
    Onboarding: '/assets/beauty-zone/11 - Phone mockup wd/Gif UX/Onboarding gif ux.gif',
    'Home Page': '/assets/beauty-zone/11 - Phone mockup wd/Gif UX/Home page gif ux.gif',
    'Shop Page': '/assets/beauty-zone/11 - Phone mockup wd/Gif UX/Shope page gif ux.gif',
    'Products Identifier': '/assets/beauty-zone/11 - Phone mockup wd/Gif UX/Product identifier gif ux.gif',
    'My Profile': '/assets/beauty-zone/11 - Phone mockup wd/Gif UX/My profile gif ux.gif'
  };


  public wireframesDesignMenu: {
    selectedItem: MenuItems,
    videoSrc: string,
    imageTextUrl: string
  } = {
    selectedItem: 'Onboarding',
    videoSrc: this.isUI ? this.uiImageVideoUrls.Onboarding : this.uxImageVideoUrls.Onboarding,
    imageTextUrl: this.imageTextUrls.Onboarding
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  public changeUIUX(newState: boolean) {
    this.isUI = newState;
    this.wireframesDesignMenu.imageTextUrl = this.imageTextUrls[this.wireframesDesignMenu.selectedItem];
    this.wireframesDesignMenu.videoSrc = this.isUI ? this.uiImageVideoUrls[this.wireframesDesignMenu.selectedItem] : this.uxImageVideoUrls[this.wireframesDesignMenu.selectedItem];
  }

  public setMenuItem(item: MenuItems) {
    this.wireframesDesignMenu.selectedItem = item;
    this.wireframesDesignMenu.imageTextUrl = this.imageTextUrls[this.wireframesDesignMenu.selectedItem];
    this.wireframesDesignMenu.videoSrc = this.isUI ? this.uiImageVideoUrls[this.wireframesDesignMenu.selectedItem] : this.uxImageVideoUrls[this.wireframesDesignMenu.selectedItem];
  }


  public increase(x: number) {
    return x + 1;
  }

  public scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({behavior});
  }
}
