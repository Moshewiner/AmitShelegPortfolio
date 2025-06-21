import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectItemComponent } from './project-item/project-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, ProjectItemComponent, CommonModule]
})
export class NewHomeComponent implements OnInit, AfterViewInit {
  public route: string = '/';

  private screens!: HTMLCollectionOf<Element>;
  // tslint:disable-next-line:variable-name
  private _screenIndex = 0;
  private get screenIndex(): number {
    return this._screenIndex;
  }
  private set screenIndex(value: number) {
    this._screenIndex = value;

    if(this.screens[value].id) {
      const a = this.el.nativeElement.querySelector(`#` + this.screens[value].id);
      window.scrollTo({ top: a.offsetTop, behavior: 'smooth'});
    }
  }

  // Logo images array for native carousel
  public logoImages = [
    { src: '/assets/new-home/logo-strip/elal.svg', alt: 'El Al' },
    { src: '/assets/new-home/logo-strip/cargo.svg', alt: 'Cargo' },
    { src: '/assets/new-home/logo-strip/applied-materials.svg', alt: 'Applied Materials' },
    { src: '/assets/new-home/logo-strip/clalit.svg', alt: 'Clalit' },
    { src: '/assets/new-home/logo-strip/gov.svg', alt: 'Government' },
    { src: '/assets/new-home/logo-strip/ram.svg', alt: 'Ram Aderet' },
  ];

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
 
  }

  ngOnInit(): void {
  }

  public newProjects = [
    { 
      image: '/assets/new-home/item.png', 
      name: 'EL AL CARGO',
      title: 'Redesigning and Refining the El Al Cargo Website', 
      link: '/elal-cargo',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'GOV.IL - SHAHAF',
      title: 'Government Shahaf Digital Platform', 
      link: '/gov-shahaf',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'GOV.IL - ONBOARDING',
      title: 'Government Services Digital Onboarding', 
      link: '/gov-onboarding',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'EL AL GLOBALY',
      title: 'El Al Globaly Digital Platform', 
      link: '/elal-globaly',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'RAM ADERET',
      title: 'Ram Aderet Digital Platform', 
      link: '/ram-aderet',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'CLALIT',
      title: 'Clalit Health Services Digital Transformation', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'VONOTEAM',
      title: 'VonoTeam Digital Platform', 
      link: '/vonoteam',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'ABRA',
      title: 'Abra Digital Banking Platform', 
      link: '/abra',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'APPLIED MATERIALS',
      title: 'Applied Materials Digital Platform', 
      link: '/applied-materials',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'CELLCOM POC',
      title: 'Cellcom POC Digital Platform', 
      link: '/cellcom-poc',
    },
  ];

  // Split projects into two columns
  get leftColumnProjects() {
    return this.newProjects.filter((_, index) => index % 2 === 0);
  }

  get rightColumnProjects() {
    return this.newProjects.filter((_, index) => index % 2 === 1);
  }


  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({behavior});
  }

}
