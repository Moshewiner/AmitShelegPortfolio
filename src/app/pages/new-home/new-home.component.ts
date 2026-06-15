import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectItemComponent } from './project-item/project-item.component';

import { ModalComponent } from '../../components/modal/modal.component';
import { BasePageComponent } from '../base-page/base-page.component';

// Project interface for the modal
interface ModalProject {
  title: string;
  description: string;
  heroImage: string;
  client: string;
  duration: string;
  platform: string;
  introduction: string;
  content: {
    images: string[];
  };
}

@Component({
    selector: 'app-home',
    templateUrl: './new-home.component.html',
    styleUrls: ['./new-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, ProjectItemComponent, ModalComponent, BasePageComponent]
})
export class NewHomeComponent implements OnInit, AfterViewInit {
  public route: string = '/';

  // Modal state
  public isModalOpen = false;
  public selectedProject: ModalProject | null = null;
  public selectedRect: DOMRect | null = null;
  /** Link of the card currently open in the modal (drives the pressed look). */
  public activeLink: string | null = null;
  /** Guards against re-entrant close while the reverse morph is playing. */
  private closing = false;
  private reverseClone: HTMLImageElement | null = null;
  /** Previous <html> overflow, saved while the reverse morph locks the page. */
  private htmlOverflowPrev: string | null = null;

  @ViewChild(BasePageComponent) private basePage?: BasePageComponent;

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

  public newProjects = [
    { 
      image: '/assets/Cargo/preview.png', 
      name: 'EL AL CARGO',
      title: `Redesigning and Refining [El Al] Cargo's Website & App`, 
      link: '/elal-cargo',
    },
    { 
      image: '/assets/Routines/preview.png', 
      name: 'ROUTINES.AI',
      title: `Leading the Design of an Orchestration & Scheduling Platform`, 
      link: '',
    },
    { 
      image: '/assets/Shahaf-gov/shahaf-preview.png', 
      name: 'GOV.IL - SHAHAF',
      title: 'Simplifying Freedom of Information (FOI) Requests Management', 
      link: '/gov-shahaf',
    },
    { 
      image: '/assets/GlobaLY/preview.png', 
      name: 'EL AL GLOBALY',
      title: `Smarter Tools for El Al's Airport Operations`, 
      link: '/elal-globaly',
    },
    { 
      image: '/assets/Clalit/preview.png', 
      name: 'CLALIT',
      title: `Enhancing Clalit's Workshop Registration Experience`, 
      link: '/clalit',
    },
    // { 
    //   image: '/assets/new-home/h.png', 
    //   name: 'RAM ADERET',
    //   title: 'Ram Aderet Digital Platform', 
    //   link: '/ram-aderet',
    // },
    // { 
    //   image: '/assets/new-home/item.png', 
    //   name: 'GOV.IL - ONBOARDING',
    //   title: 'Government Services Digital Onboarding', 
    //   link: '/gov-onboarding',
    // },
    // { 
    //   image: '/assets/new-home/h.png', 
    //   name: 'VONOTEAM',
    //   title: 'VonoTeam Digital Platform', 
    //   link: '/vonoteam',
    // },
    // { 
    //   image: '/assets/new-home/h.png', 
    //   name: 'ABRA',
    //   title: 'Abra Digital Banking Platform', 
    //   link: '/abra',
    // },
    // { 
    //   image: '/assets/new-home/h.png', 
    //   name: 'APPLIED MATERIALS',
    //   title: 'Applied Materials Digital Platform', 
    //   link: '/applied-materials',
    // },
    // { 
    //   image: '/assets/new-home/h.png', 
    //   name: 'CELLCOM POC',
    //   title: 'Cellcom POC Digital Platform', 
    //   link: '/cellcom-poc',
    // },
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

  // Modal methods
  onProjectClick(event: {link: string, rect: DOMRect}) {
    const project = this.newProjects.find(p => p.link === event.link);
    if (project) {
      // Create modal project data from home project data
      this.selectedProject = {
        title: project.title,
        description: project.title, // Using title as description for now
        heroImage: project.image,
        client: project.name,
        duration: '6 months', // Default duration
        platform: 'Web & Mobile', // Default platform
        introduction: `${project.title} - This is a showcase of our design and development capabilities.`,
        content: {
          images: [project.image, project.image] // Using the preview image
        }
      };
      this.selectedRect = event.rect;
      this.activeLink = event.link;
      this.isModalOpen = true;
      this.closing = false;
      this.cdr.markForCheck();
    }
  }

  /**
   * Close handler. On mobile we play the OPEN morph in reverse: a fixed clone
   * of the hero shrinks back into the home card cover. The clone lives on
   * document.body (owned here, not in the modal) so it survives the modal/base
   * page teardown, and we measure the hero rect BEFORE tearing anything down.
   */
  onCloseModal() {
    if (this.closing) {
      return;
    }
    this.closing = true;

    // Measure the live hero BEFORE we start closing (it's destroyed on teardown).
    const heroEl = this.basePage?.heroImageRef?.nativeElement;
    const heroRect = heroEl?.getBoundingClientRect();
    const heroSrc = this.selectedProject?.heroImage ?? null;
    const cardRect = this.selectedRect;

    const canMorph =
      !this.prefersReducedMotion() &&
      !!heroRect && heroRect.width > 0 && heroRect.height > 0 &&
      !!cardRect && !!heroSrc;

    // Start fading the modal out and un-dimming the card right away, so the
    // home card is revealed underneath as the hero shrinks back into it.
    this.isModalOpen = false;
    this.activeLink = null;
    this.cdr.markForCheck();

    if (canMorph) {
      this.playReverseMorph(heroRect!, heroSrc!, cardRect!);
    } else {
      this.finalizeClose();
    }
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  private playReverseMorph(heroRect: DOMRect, heroSrc: string, cardRect: DOMRect): void {
    // Lock the page scroll for the whole reverse flight. We lock <html> (not
    // <body>) because the modal restores body overflow as it closes; locking
    // the document element keeps the home card from drifting mid-morph.
    this.lockWindowScroll();

    const clone = document.createElement('img');
    clone.src = heroSrc;
    clone.alt = '';
    clone.setAttribute('aria-hidden', 'true');

    const s = clone.style;
    s.position = 'fixed';
    s.top = `${heroRect.top}px`;
    s.left = `${heroRect.left}px`;
    s.width = `${heroRect.width}px`;
    s.height = `${heroRect.height}px`;
    s.margin = '0';
    s.padding = '0';
    s.objectFit = 'cover';
    s.borderRadius = '24px';
    s.zIndex = '99999';
    s.pointerEvents = 'none';
    s.transformOrigin = 'top left';
    // Only transform + opacity animate; promote to its own GPU layer.
    s.willChange = 'transform, opacity';
    s.transform = 'translateZ(0)';
    s.backfaceVisibility = 'hidden';
    document.body.appendChild(clone);
    this.reverseClone = clone;

    const dx = cardRect.left - heroRect.left;
    const dy = cardRect.top - heroRect.top;
    const sx = cardRect.width / heroRect.width;
    const sy = cardRect.height / heroRect.height;

    // Safety net: always finish even if the animation never fires onfinish.
    const fallback = setTimeout(() => this.finalizeClose(), 1500);
    const done = () => {
      clearTimeout(fallback);
      this.finalizeClose();
    };

    // One rAF so the clone is laid out at its start rect before animating,
    // avoiding a dropped first frame. Animate ONLY transform (translate3d +
    // scale3d) — symmetric easing/duration with the open morph; border-radius
    // stays static so there are no per-frame repaints.
    requestAnimationFrame(() => {
      let flight: Animation | null = null;
      try {
        flight = clone.animate(
          [
            { transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)' },
            { transform: `translate3d(${dx}px, ${dy}px, 0) scale3d(${sx}, ${sy}, 1)` },
          ],
          { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
        );
      } catch {
        done();
        return;
      }
      flight.onfinish = done;
      flight.oncancel = done;
    });
  }

  private lockWindowScroll(): void {
    if (this.htmlOverflowPrev !== null) {
      return;
    }
    this.htmlOverflowPrev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
  }

  private unlockWindowScroll(): void {
    if (this.htmlOverflowPrev !== null) {
      document.documentElement.style.overflow = this.htmlOverflowPrev;
      this.htmlOverflowPrev = null;
    }
  }

  private finalizeClose() {
    // Remove the flying clone, then fully tear down the modal and clear the
    // pressed/dimmed state so nothing is ever left blurred or invisible.
    if (this.reverseClone && this.reverseClone.parentNode) {
      this.reverseClone.parentNode.removeChild(this.reverseClone);
    }
    this.reverseClone = null;
    // Always release the page scroll lock (covers fallback/cancel paths too).
    this.unlockWindowScroll();

    this.isModalOpen = false;
    this.selectedProject = null;
    this.selectedRect = null;
    this.activeLink = null;
    this.closing = false;
    this.cdr.markForCheck();
  }

}
