import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoBreakPipe } from '../../pipes/no-break.pipe';


@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NoBreakPipe],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss'
})
export class BasePageComponent implements OnInit {

  @Input() project = {
    title: 'Base Title',
    description: 'Example Description with [non-breaking phrases] for better typography.',
    heroImage: './../../assets/elal-cargo/hero.png',
    client: 'Example Client',
    duration: '1 year',
    platform: 'Example Platform',
    introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. [Sed do eiusmod tempor] incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. [Duis aute irure dolor] in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    content: {
      images: [
        './../../assets/elal-cargo/hero.png',
        './../../assets/elal-cargo/hero.png'
      ]
    }
  };

  constructor() { }

  ngOnInit(): void {
    // Scroll to top when the base page component initializes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Method to scroll to specific sections if needed
  public scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
