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
      name: 'CLALIT',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'EL AL GLOBALLY',
      title: 'Smarter Tools for El Al\'s Airport Operations', 
      link: '/el-al-globally',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'GOVIL - SHAHAF',
      title: 'An interesting title for the project', 
      link: '/govil-shahaf',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'PROJECT FIVE',
      title: 'A Comprehensive Design System for Modern Applications', 
      link: '/project-five',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'PROJECT SIX',
      title: 'Mobile-First Approach to Complex Data Visualization and User Interface Design', 
      link: '/project-six',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'PROJECT SEVEN',
      title: 'Redesigning Enterprise Software with Focus on User Experience', 
      link: '/project-seven',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'PROJECT EIGHT',
      title: 'Cross-Platform Design Solutions', 
      link: '/project-eight',
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
