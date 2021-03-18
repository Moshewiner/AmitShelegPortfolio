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
    introduction: `Addict is a women's clothing brand that produces its own designed clothing while selling trendy and high-quality items at a fair price.

I wanted this brand to pop amongst its competition and to create an invisible user experience.
With a focus on e-commerce revenue, I wanted to craft a compelling and memorable experience.`,
    problem: `Addict is a website of an existing store that has been running for several years.  As part of the online shopping revolution, addict began to lose customers, and they've decided to open their online shopping platform.

The shopping experience on the website doesn’t attract the users to take out the credit card and make a purchase.
There is no call to action, the details and information on the site are poor and inefficient, the forms are long and unclear, and overall the whole experience was not attractive.`,
    solution: `The site was upgraded visually and user-friendly to suit the users' needs. The change enables a comfortable and pleasant orientation on the site and creates a good shopping experience that will eventually be translated into increasing the store's revenues.`,
    inspirations: `I was inspired by soft natural colors and vintage style when I designed e-commerce.
I thought of how order can give a calm and elegant feel to the user.`
  };


  ngOnInit(): void {
  }


  public scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({behavior});
  }
}
