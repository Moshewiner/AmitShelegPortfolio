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
      name: 'clalit',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'clalit',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'clalit',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'clalit',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/h.png', 
      name: 'clalit',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'clalit',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'clalit',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
    { 
      image: '/assets/new-home/item.png', 
      name: 'clalit',
      title: 'Enhancing Clalit\'s Workshop Registration Experience', 
      link: '/clalit',
    },
  ];


  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({behavior});
  }

}
