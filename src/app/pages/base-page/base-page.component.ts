import { Component, Input, OnInit, OnDestroy, AfterViewInit, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoBreakPipe } from '../../pipes/no-break.pipe';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { CtaComponent } from '../../components/cta/cta.component';
import { ProjectNavItem, getProjectNav } from '../../data/project-nav';


@Component({
    selector: 'app-base-page',
    imports: [RouterModule, NoBreakPipe, RevealOnScrollDirective, CtaComponent],
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

  /**
   * Previous/next case study, shown at the end of a routed project page so you
   * can keep browsing without going back to the home page. Null in the mobile
   * drawer and on pages that aren't part of the published project list.
   */
  public projectNav: { prev: ProjectNavItem; next: ProjectNavItem } | null = null;

  /** Shown in the content area when a project has no gallery images yet. */
  public readonly comingSoonImage = '/assets/coming-soon/coming-soon-desktop.webp';
  public readonly comingSoonImageMobile = '/assets/coming-soon/coming-soon-mobile.webp';

  /** True when the case study has no images yet - render the empty state. */
  get isComingSoon(): boolean {
    return !this.project?.content?.images?.length;
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

  /**
   * Pinch-to-zoom / pan state for the lightbox image (native photo-gallery
   * style). The image is transformed as `translate(tx, ty) scale(scale)` about
   * its center; `zoomTransition` only turns on for snap-back / double-tap so
   * live pinching stays 1:1 with the fingers.
   */
  zoomScale = 1;
  zoomTx = 0;
  zoomTy = 0;
  zoomTransition = false;

  private readonly maxScale = 4;
  /** What the active touch sequence is doing. */
  private gesture: 'none' | 'swipe' | 'pinch' | 'pan' = 'none';
  private pinchStartDist = 0;
  private pinchStartScale = 1;
  private pinchStartTx = 0;
  private pinchStartTy = 0;
  /** Pinch midpoint relative to the viewport center (kept anchored). */
  private pinchMidX = 0;
  private pinchMidY = 0;
  private panStartX = 0;
  private panStartY = 0;
  private panStartTx = 0;
  private panStartTy = 0;
  /** Distinguishes a tap (double-tap zoom) from a drag (swipe / pan). */
  private touchMoved = false;
  private lastTapTime = 0;

  get imageTransform(): string {
    return `translate(${this.zoomTx}px, ${this.zoomTy}px) scale(${this.zoomScale})`;
  }

  private morphClone: HTMLImageElement | null = null;
  private morphStarted = false;
  private destroyed = false;
  private morphFallback: ReturnType<typeof setTimeout> | null = null;
  /** Scrollable ancestors locked for the morph duration (restored after). */
  private scrollLocks: { el: HTMLElement; prev: string }[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private el: ElementRef<HTMLElement>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
    // Only routed pages get the prev/next nav; inside the mobile drawer the
    // active route is the home page, and the sheet has its own close affordance.
    this.projectNav = this.inDrawer ? null : getProjectNav(this.currentProjectLink());

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
   * The PROJECTS key for the page we're on. Each project component wraps this
   * one without passing its own link down, so we read it off the active route
   * (`elal-cargo` -> `/elal-cargo`) and fall back to the raw URL.
   */
  private currentProjectLink(): string {
    const path = this.route.snapshot.routeConfig?.path;
    return path ? `/${path}` : this.router.url.split(/[?#]/)[0];
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
    // The "coming soon" empty state is not a real asset - never open it.
    if (this.isComingSoon) {
      return;
    }
    this.currentIndex = index;
    this.slides = [{ src: this.project.content.images[index], key: 'c' + index }];
    this.trackTransform = 'translateX(0)';
    this.sliding = false;
    this.pendingIndex = null;
    this.resetZoom();
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.sliding = false;
    this.pendingIndex = null;
    this.resetZoom();
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
    // Navigating always returns the image to its natural, un-panned size.
    this.resetZoom();
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
    this.zoomTransition = false;

    if (event.touches.length >= 2) {
      // Two fingers down: start a pinch. Remember the starting spread, scale
      // and translation, plus the midpoint between the fingers so we can keep
      // that point of the image anchored as it scales.
      this.gesture = 'pinch';
      this.pinchStartDist = this.touchDistance(event);
      this.pinchStartScale = this.zoomScale;
      this.pinchStartTx = this.zoomTx;
      this.pinchStartTy = this.zoomTy;
      const mid = this.touchMidpoint(event);
      this.pinchMidX = mid.x - window.innerWidth / 2;
      this.pinchMidY = mid.y - window.innerHeight / 2;
      return;
    }

    const t = event.touches[0];
    this.touchMoved = false;

    if (this.zoomScale > 1) {
      // Already zoomed in: a one-finger drag pans the image.
      this.gesture = 'pan';
      this.panStartX = t.clientX;
      this.panStartY = t.clientY;
      this.panStartTx = this.zoomTx;
      this.panStartTy = this.zoomTy;
    } else {
      // At natural size: a one-finger drag swipes between images.
      this.gesture = 'swipe';
      this.touchStartX = t.clientX;
      this.touchStartY = t.clientY;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (this.gesture === 'pinch' && event.touches.length >= 2) {
      if (this.pinchStartDist <= 0) {
        return;
      }
      const next = (this.touchDistance(event) / this.pinchStartDist) * this.pinchStartScale;
      this.zoomScale = Math.min(this.maxScale, Math.max(1, next));
      // Keep the pinch midpoint over the same image point as it scales.
      const ratio = this.zoomScale / this.pinchStartScale;
      this.zoomTx = this.pinchMidX - ratio * (this.pinchMidX - this.pinchStartTx);
      this.zoomTy = this.pinchMidY - ratio * (this.pinchMidY - this.pinchStartTy);
      this.clampPan(this.imgFromEvent(event));
      this.cdr.detectChanges();
    } else if (this.gesture === 'pan' && event.touches.length === 1) {
      const t = event.touches[0];
      // Ignore tiny jitter so a stationary double-tap (to zoom back out) isn't
      // mistaken for a pan drag.
      if (Math.abs(t.clientX - this.panStartX) > 6 || Math.abs(t.clientY - this.panStartY) > 6) {
        this.touchMoved = true;
      }
      this.zoomTx = this.panStartTx + (t.clientX - this.panStartX);
      this.zoomTy = this.panStartTy + (t.clientY - this.panStartY);
      this.clampPan(this.imgFromEvent(event));
      this.cdr.detectChanges();
    } else if (this.gesture === 'swipe') {
      const t = event.touches[0];
      if (Math.abs(t.clientX - this.touchStartX) > 6 || Math.abs(t.clientY - this.touchStartY) > 6) {
        this.touchMoved = true;
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.gesture === 'pinch') {
      // Snap back to natural size (and re-center) if pinched to/below 1x.
      if (this.zoomScale <= 1.01) {
        this.resetZoom(true);
      } else {
        this.clampPan(this.imgFromEvent(event));
      }
      this.gesture = 'none';
      this.cdr.detectChanges();
      return;
    }

    // Single-finger gesture (pan when zoomed, swipe otherwise).
    const wasPan = this.gesture === 'pan';
    this.gesture = 'none';

    // A stationary touch is a tap - double-tap toggles zoom in OR out. This must
    // run for both pan (zoomed in) and swipe (zoomed out) so you can zoom back.
    if (!this.touchMoved) {
      const now = Date.now();
      if (now - this.lastTapTime < 300) {
        this.lastTapTime = 0;
        const t = event.changedTouches[0];
        this.toggleZoomAt(t.clientX, t.clientY, this.imgFromEvent(event));
      } else {
        this.lastTapTime = now;
      }
      return;
    }

    // A drag while zoomed just panned the image - nothing to do on release.
    if (wasPan) {
      return;
    }

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

  /** Double-click (mouse) zooms in/out at the cursor, like double-tap on touch. */
  onDoubleClick(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleZoomAt(event.clientX, event.clientY, this.imgFromEvent(event));
  }

  /**
   * Toggle between natural size and a 2.5x zoom centered on (x, y). Shared by
   * double-tap (touch) and double-click (mouse).
   */
  private toggleZoomAt(x: number, y: number, img?: HTMLImageElement | null): void {
    this.zoomTransition = true;
    if (this.zoomScale > 1) {
      this.resetZoom(true);
    } else {
      const target = 2.5;
      const rx = x - window.innerWidth / 2;
      const ry = y - window.innerHeight / 2;
      this.zoomScale = target;
      // Anchor the point under the cursor: from scale 1 / translate 0, the
      // translation that keeps point r fixed is r * (1 - scale).
      this.zoomTx = rx * (1 - target);
      this.zoomTy = ry * (1 - target);
      this.clampPan(img ?? null);
    }
    this.cdr.detectChanges();
  }

  /** Reset the lightbox image to its natural, centered size. */
  private resetZoom(animated = false): void {
    this.zoomTransition = animated;
    this.zoomScale = 1;
    this.zoomTx = 0;
    this.zoomTy = 0;
  }

  /** Keep the (scaled) image from being panned entirely off-screen. */
  private clampPan(img: HTMLImageElement | null): void {
    if (!img) {
      return;
    }
    // offsetWidth/Height are the un-transformed layout size of the image.
    const w = img.offsetWidth * this.zoomScale;
    const h = img.offsetHeight * this.zoomScale;
    const maxX = Math.max(0, (w - window.innerWidth) / 2);
    const maxY = Math.max(0, (h - window.innerHeight) / 2);
    this.zoomTx = Math.min(maxX, Math.max(-maxX, this.zoomTx));
    this.zoomTy = Math.min(maxY, Math.max(-maxY, this.zoomTy));
  }

  private touchDistance(event: TouchEvent): number {
    const dx = event.touches[0].clientX - event.touches[1].clientX;
    const dy = event.touches[0].clientY - event.touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  private touchMidpoint(event: TouchEvent): { x: number; y: number } {
    return {
      x: (event.touches[0].clientX + event.touches[1].clientX) / 2,
      y: (event.touches[0].clientY + event.touches[1].clientY) / 2,
    };
  }

  private imgFromEvent(event: Event): HTMLImageElement | null {
    return event.currentTarget instanceof HTMLImageElement ? event.currentTarget : null;
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
