import { Component, Input, OnInit, OnDestroy, AfterViewInit, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { RouterModule } from '@angular/router';
import { NoBreakPipe } from '../../pipes/no-break.pipe';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';


@Component({
    selector: 'app-base-page',
    imports: [RouterModule, NoBreakPipe, RevealOnScrollDirective],
    templateUrl: './base-page.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './base-page.component.scss',
    animations: [
      trigger('lightboxFade', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('220ms ease', style({ opacity: 1 })),
        ]),
        transition(':leave', [
          animate('200ms ease', style({ opacity: 0 })),
        ]),
      ]),
    ],
})
export class BasePageComponent implements OnInit, AfterViewInit, OnDestroy {

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

  /**
   * Mobile shared-element morph: when set (by the home page modal), a fixed
   * clone of the tapped cover image flies from `morphFromRect` into this page's
   * hero image, then crossfades to the real hero. Unset on desktop router
   * pages, where the hero just plays its normal entry animation.
   */
  @Input() morphFromRect: DOMRect | null = null;
  @Input() morphFromSrc: string | null = null;
  /** True when rendered inside the mobile home drawer (not a routed page). */
  @Input() inDrawer = false;

  @HostBinding('class.in-drawer') get drawerMode(): boolean {
    return this.inDrawer;
  }

  lightboxOpen = false;
  currentIndex = 0;
  /** Slides currently rendered in the lightbox track (1 at rest, 2 during a slide). */
  slides: { src: string; key: string }[] = [];
  /** Track transform; switches between two slides to create a carousel scroll. */
  trackTransform = 'translateX(0)';
  /** True only while the track is mid-transition (adds the CSS transition). */
  sliding = false;
  private pendingIndex: number | null = null;

  /** Drives the hero shimmer skeleton; flips true once the hero image paints. */
  heroLoaded = false;
  /** True while the morph clone is flying in; keeps the real hero hidden. */
  morphActive = false;
  /** Hides the real hero (opacity 0) until the clone reaches it. */
  heroHidden = false;

  @ViewChild('heroImage') heroImageRef?: ElementRef<HTMLImageElement>;

  private touchStartX = 0;
  private touchStartY = 0;

  private morphClone: HTMLImageElement | null = null;
  private morphStarted = false;
  private destroyed = false;
  private morphFallback: ReturnType<typeof setTimeout> | null = null;
  /** Scrollable ancestors locked for the morph duration (restored after). */
  private scrollLocks: { el: HTMLElement; prev: string }[] = [];

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef<HTMLElement>) { }

  @HostBinding('@.disabled') get animationsDisabled(): boolean {
    return this.prefersReducedMotion();
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  ngOnInit(): void {
    this.morphActive =
      !!this.morphFromRect && !!this.morphFromSrc && !this.prefersReducedMotion();

    if (this.morphActive) {
      // Hold the real hero hidden and spawn the flying clone over the card.
      this.heroHidden = true;
      this.createMorphClone();
      // Safety net so the hero is never stuck hidden if 'load' never fires.
      this.morphFallback = setTimeout(() => this.finishMorph(), 2500);
    } else if (!this.inDrawer) {
      // Full-page (desktop) behavior: a freshly opened project page must start
      // at the very top. In the mobile drawer the sheet has its own internal
      // scroll, so we must NOT scroll the window (that would move the home page
      // underneath the open sheet).
      this.scrollPageToTop();
    }
  }

  /**
   * Reset every candidate scroller to the top. The site scrolls on <body>
   * (overflow-x:hidden makes <body> the scroll container), so window.scrollTo /
   * Angular's ViewportScroller alone don't reset it and the new page would keep
   * the previous page's scroll position.
   */
  private scrollPageToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  ngAfterViewInit(): void {
    // Lock scrolling for the whole morph so the fixed clone and the (scrollable)
    // hero/card never drift apart mid-flight.
    if (this.morphActive) {
      this.lockScroll();
    }

    const img = this.heroImageRef?.nativeElement;
    // Cached images can fire 'load' before the binding is attached, which would
    // otherwise leave the skeleton up (or the hero hidden) forever.
    if (img && img.complete && img.naturalWidth > 0) {
      this.heroLoaded = true;
      if (this.morphActive) {
        requestAnimationFrame(() => this.runMorph());
      }
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.destroyed = true;
    this.cleanupMorph();
  }

  onHeroLoad(): void {
    this.heroLoaded = true;
    if (this.morphActive) {
      requestAnimationFrame(() => this.runMorph());
    }
  }

  private createMorphClone(): void {
    const rect = this.morphFromRect;
    if (!rect || !this.morphFromSrc) {
      return;
    }
    const clone = document.createElement('img');
    clone.src = this.morphFromSrc;
    clone.alt = '';
    clone.setAttribute('aria-hidden', 'true');

    const s = clone.style;
    s.position = 'fixed';
    s.top = `${rect.top}px`;
    s.left = `${rect.left}px`;
    s.width = `${rect.width}px`;
    s.height = `${rect.height}px`;
    s.margin = '0';
    s.padding = '0';
    s.objectFit = 'cover';
    s.borderRadius = '16px';
    s.zIndex = '99999';
    s.pointerEvents = 'none';
    s.transformOrigin = 'top left';
    // Only transform + opacity animate, so the clone stays on the compositor.
    s.willChange = 'transform, opacity';
    // Promote to its own GPU layer to avoid repaints during the flight.
    s.transform = 'translateZ(0)';
    s.backfaceVisibility = 'hidden';

    document.body.appendChild(clone);
    this.morphClone = clone;
  }

  private runMorph(): void {
    if (this.morphStarted || this.destroyed) {
      return;
    }
    const clone = this.morphClone;
    const heroImg = this.heroImageRef?.nativeElement;
    const from = this.morphFromRect;
    if (!clone || !heroImg || !from) {
      this.finishMorph();
      return;
    }

    const to = heroImg.getBoundingClientRect();
    if (!to.width || !to.height) {
      this.finishMorph();
      return;
    }
    this.morphStarted = true;

    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const sx = to.width / from.width;
    const sy = to.height / from.height;

    // Animate ONLY compositor-friendly properties (transform via translate3d +
    // scale3d). border-radius is left static so there are no per-frame repaints.
    const flight = clone.animate(
      [
        { transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)' },
        { transform: `translate3d(${dx}px, ${dy}px, 0) scale3d(${sx}, ${sy}, 1)` },
      ],
      { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
    );

    flight.onfinish = () => {
      // Reveal the real hero, then fade the clone out over it. The home preview
      // and the modal hero are the same image, so the swap is seamless.
      this.revealHero();
      const fade = clone.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 220,
        easing: 'ease',
        fill: 'forwards',
      });
      fade.onfinish = () => this.cleanupMorph();
    };
  }

  /** Make the real hero visible (used at crossfade time and as a fallback). */
  private revealHero(): void {
    this.heroHidden = false;
    const img = this.heroImageRef?.nativeElement;
    if (img) {
      img.style.transition = 'opacity 240ms ease';
      img.style.opacity = '1';
    }
    if (!this.destroyed) {
      this.cdr.detectChanges();
    }
  }

  /** Bail out of the morph and guarantee the hero is shown. */
  private finishMorph(): void {
    this.morphStarted = true;
    this.morphActive = false;
    this.revealHero();
    this.cleanupMorph();
  }

  private cleanupMorph(): void {
    if (this.morphFallback) {
      clearTimeout(this.morphFallback);
      this.morphFallback = null;
    }
    if (this.morphClone && this.morphClone.parentNode) {
      this.morphClone.parentNode.removeChild(this.morphClone);
    }
    this.morphClone = null;
    // Always release the scroll lock, on every end path (finish/fallback/destroy).
    this.unlockScroll();
  }

  /** Lock scrollable ancestors (e.g. the modal body) for the morph duration. */
  private lockScroll(): void {
    if (this.scrollLocks.length) {
      return;
    }
    let node: HTMLElement | null = this.el.nativeElement.parentElement;
    while (node) {
      const overflowY = getComputedStyle(node).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        this.scrollLocks.push({ el: node, prev: node.style.overflow });
        node.style.overflow = 'hidden';
      }
      node = node.parentElement;
    }
  }

  private unlockScroll(): void {
    // Reset to the natural (stylesheet-driven) state rather than a captured
    // inline value. These ancestors (incl. <html> and the modal body) carry no
    // inline overflow in normal use, and restoring a stale captured 'hidden'
    // here was one of the ways the page could end up permanently unscrollable.
    for (const lock of this.scrollLocks) {
      lock.el.style.overflow = '';
    }
    this.scrollLocks = [];
  }

  // Method to scroll to specific sections if needed
  public scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openLightbox(index: number): void {
    this.currentIndex = index;
    this.slides = [{ src: this.project.content.images[index], key: 'c' + index }];
    this.trackTransform = 'translateX(0)';
    this.sliding = false;
    this.pendingIndex = null;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.sliding = false;
    this.pendingIndex = null;
    document.body.style.overflow = '';
  }

  nextImage(): void {
    const total = this.project.content.images.length;
    this.slideTo((this.currentIndex + 1) % total, false);
  }

  prevImage(): void {
    const total = this.project.content.images.length;
    this.slideTo((this.currentIndex - 1 + total) % total, true);
  }

  /**
   * Lays the incoming image next to the current one and translates the whole
   * track by one slide so they scroll together like a carousel.
   * `fromLeft` true => incoming sits on the left (used by "next").
   */
  private slideTo(incoming: number, fromLeft: boolean): void {
    if (this.sliding || incoming === this.currentIndex) {
      return;
    }
    const imgs = this.project.content.images;

    if (this.prefersReducedMotion()) {
      this.currentIndex = incoming;
      this.slides = [{ src: imgs[incoming], key: 'c' + incoming }];
      this.trackTransform = 'translateX(0)';
      this.cdr.detectChanges();
      return;
    }

    this.pendingIndex = incoming;
    if (fromLeft) {
      this.slides = [
        { src: imgs[incoming], key: 'in' },
        { src: imgs[this.currentIndex], key: 'cur' },
      ];
      this.trackTransform = 'translateX(-100%)';
    } else {
      this.slides = [
        { src: imgs[this.currentIndex], key: 'cur' },
        { src: imgs[incoming], key: 'in' },
      ];
      this.trackTransform = 'translateX(0)';
    }
    this.sliding = false;
    this.cdr.detectChanges();

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        this.sliding = true;
        this.trackTransform = fromLeft ? 'translateX(0)' : 'translateX(-100%)';
        this.cdr.detectChanges();
      })
    );
  }

  onSlideTransitionEnd(): void {
    if (!this.sliding || this.pendingIndex === null) {
      return;
    }
    this.currentIndex = this.pendingIndex;
    this.pendingIndex = null;
    this.slides = [{ src: this.project.content.images[this.currentIndex], key: 'c' + this.currentIndex }];
    this.trackTransform = 'translateX(0)';
    this.sliding = false;
    this.cdr.detectChanges();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
    this.touchStartY = event.changedTouches[0].clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    const deltaY = event.changedTouches[0].clientY - this.touchStartY;
    const threshold = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < -threshold) {
        this.nextImage();
      } else if (deltaX > threshold) {
        this.prevImage();
      }
    } else {
      if (deltaY < -threshold) {
        this.nextImage();
      } else if (deltaY > threshold) {
        this.prevImage();
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) {
      return;
    }

    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.nextImage();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.prevImage();
        break;
    }
  }

}
