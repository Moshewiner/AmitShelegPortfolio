import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

import { ModalComponent } from '../../components/modal/modal.component';
import { BasePageComponent } from '../base-page/base-page.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { Project, getProject } from '../../data/projects';
import { HOME_PROJECTS, homeProjectColumns } from '../../data/home-projects';

@Component({
    selector: 'app-home',
    templateUrl: './new-home.component.html',
    styleUrls: ['./new-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ProjectItemComponent, ModalComponent, BasePageComponent, RevealOnScrollDirective, CtaComponent]
})
export class NewHomeComponent implements OnInit, AfterViewInit {
  public route: string = '/';

  // Modal state
  public isModalOpen = false;
  public selectedProject: Project | null = null;
  public selectedRect: DOMRect | null = null;
  /** Link of the card currently open in the modal (drives the pressed look). */
  public activeLink: string | null = null;
  /** Guards against re-entrant close while the dismiss animation is playing. */
  private closing = false;

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

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
 
  }

  ngOnInit(): void {
  }

  /** Source of truth lives in data/home-projects.ts so the prev/next nav can share it. */
  public newProjects = HOME_PROJECTS;

  // Split projects into two columns
  get leftColumnProjects() {
    return homeProjectColumns().left;
  }

  get rightColumnProjects() {
    return homeProjectColumns().right;
  }


  scroll(e: HTMLElement, behavior: 'auto' | 'smooth' = 'auto') {
    e.scrollIntoView({behavior});
  }

  // Modal methods
  onProjectClick(event: {link: string, rect: DOMRect}) {
    const card = this.newProjects.find(p => p.link === event.link);
    const data = getProject(event.link);
    if (card && data) {
      // Use the real case-study data (same source as the desktop route page) so
      // the mobile modal shows the full image set and correct metadata. Keep the
      // tapped cover as the hero so the shared-element morph stays seamless.
      this.selectedProject = {
        ...data,
        heroImage: card.image,
      };
      this.selectedRect = event.rect;
      this.activeLink = event.link;
      this.isModalOpen = true;
      this.closing = false;
      this.cdr.markForCheck();
    }
  }

  /**
   * Close handler. The drawer dismisses itself with the modal's iOS-style
   * slide-down (leave) animation; here we just flip the state. The selected
   * project is kept mounted until the slide-out finishes so the sheet doesn't
   * vanish mid-animation, then everything is reset so it can reopen cleanly.
   */
  onCloseModal() {
    if (this.closing) {
      return;
    }
    this.closing = true;

    this.isModalOpen = false;
    this.activeLink = null;
    this.cdr.markForCheck();

    // A touch longer than the sheet's dismiss animation (360ms).
    window.setTimeout(() => {
      this.selectedProject = null;
      this.selectedRect = null;
      this.closing = false;
      this.cdr.markForCheck();
    }, 420);
  }

}
