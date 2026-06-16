import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
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

  ngOnInit(): void {
    const element = this.el.nativeElement;
    const revealClass = this.revealVariant === 'fade' ? 'reveal-fade' : 'reveal-up';
    this.renderer.addClass(element, revealClass);

    if (this.shouldRevealImmediately()) {
      this.reveal();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal();
            if (this.revealOnce) {
              this.observer?.unobserve(element);
            }
          }
        }
      },
      // Trigger on any sliver of the element, and a touch before it scrolls
      // into view (positive bottom margin), so reveals fire reliably on mobile
      // even during scroll jank instead of being missed.
      { threshold: 0.01, rootMargin: '0px 0px 120px 0px' }
    );
    this.observer.observe(element);

    // Safety net: never leave content permanently invisible if the observer
    // misses an entry (which can happen on slow mobile devices during heavy
    // load). After a few seconds, reveal regardless.
    this.fallbackTimer = setTimeout(() => this.reveal(), 3000);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.fallbackTimer !== undefined) {
      clearTimeout(this.fallbackTimer);
    }
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
