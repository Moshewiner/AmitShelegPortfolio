import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beauty-zone',
  templateUrl: './beauty-zone.component.html',
  styleUrls: ['./beauty-zone.component.scss']
})
export class BeautyZoneComponent implements OnInit {


    public texts: {[key: string]: string} = {
      introduction: `How many times have you run into a stunning makeup look and wished to know how to do it on your own? Or maybe find out what mascara did she use to get those outstanding lashes?

      Have you spent too much money and hours trying to get the desired look and finally got exhausted and unsatisfied from the result?
      
      Meet BeautyZone.`,
      userResearch: `The first part of the project was to conduct interviews with people from the beauty world, both content creator
      and content consumer. It allowed me to understand their needs and desires in order to identify the pain points
      they encounter.
      I learned from the interviews that in order to learn and discover the best products and techniques
      independently, they mainly use free platform such as Instagram, Pinterest and YouTube. If they wish to level up
      their makeup skills to become professionals, they have to sign up for paid courses.
      Sadly, It takes a long way to practice makeup or even just to master makeup as a hobby.`,
      colors: `The color pink, is thought to be a calming color associated with love, kindness, femininity, thoughtful and
      caring. Thats why I chose it to be my primary color - to empower woman and boost giving and receiving.
      Black is associated with power, strength, elegance, sophistication, and that is exactly what I want my app to
      represent.`,
    };

  constructor() { }

  ngOnInit(): void {
  }




  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({ behavior });
  }
}
