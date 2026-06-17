import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  afterNextRender,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  @Input() revealDelay = 0;
  @Input() revealOnce = true;
  @Input() revealVariant: 'up' | 'fade' = 'up';

  private observer?: IntersectionObserver;
  private fallbackTimer?: ReturnType<typeof setTimeout>;
  private revealed = false;
  private observerReady = false;

  constructor() {
    // Wait until after the first paint so layout is stable. Starting the
    // observer in ngOnInit fires false positives on mobile (every card reads as
    // intersecting while the page is still laying out).
    afterNextRender(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.startObserver());
      });
    });
  }

  ngOnInit(): void {
    const element = this.el.nativeElement;
    const revealClass = this.revealVariant === 'fade' ? 'reveal-fade' : 'reveal-up';
    this.renderer.addClass(element, revealClass);

    if (this.shouldRevealImmediately()) {
      this.reveal();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.fallbackTimer !== undefined) {
      clearTimeout(this.fallbackTimer);
    }
  }

  private startObserver(): void {
    if (this.revealed || this.observerReady) {
      return;
    }
    this.observerReady = true;

    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }

    const element = this.el.nativeElement;
    const root = this.findScrollRoot(element);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            this.reveal();
            if (this.revealOnce) {
              this.observer?.unobserve(element);
            }
          }
        }
      },
      {
        root,
        threshold: 0.08,
        // Slight lead so the fade begins just before the item fully enters.
        rootMargin: '0px 0px 60px 0px',
      }
    );
    this.observer.observe(element);

    // Safety net: only reveal off-screen items that are genuinely near the
    // viewport, never the whole page at once.
    this.fallbackTimer = setTimeout(() => {
      if (!this.revealed && this.isNearVisibleRegion(element, root)) {
        this.reveal();
      }
    }, 5000);
  }

  private findScrollRoot(element: HTMLElement): Element | null {
    let parent = element.parentElement;
    while (parent && parent !== document.documentElement) {
      const style = getComputedStyle(parent);
      const scrollableY =
        style.overflowY === 'auto' ||
        style.overflowY === 'scroll' ||
        style.overflow === 'auto' ||
        style.overflow === 'scroll';
      if (scrollableY && parent.scrollHeight > parent.clientHeight + 1) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  }

  private isNearVisibleRegion(element: HTMLElement, root: Element | null): boolean {
    const rect = element.getBoundingClientRect();
    const lead = 80;

    if (root) {
      const rootRect = root.getBoundingClientRect();
      return rect.bottom > rootRect.top - lead && rect.top < rootRect.bottom + lead;
    }

    return rect.bottom > -lead && rect.top < window.innerHeight + lead;
  }

  private shouldRevealImmediately(): boolean {
    if (typeof IntersectionObserver === 'undefined') {
      return true;
    }
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  private reveal(): void {
    if (this.revealed) {
      return;
    }
    this.revealed = true;
    if (this.fallbackTimer !== undefined) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = undefined;
    }
    const element = this.el.nativeElement;
    if (this.revealDelay > 0) {
      element.style.animationDelay = `${this.revealDelay}s`;
    }
    this.renderer.addClass(element, 'is-revealed');
  }
}
