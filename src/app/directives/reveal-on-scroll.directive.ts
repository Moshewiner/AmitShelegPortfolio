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
      { threshold: 0.15, rootMargin: '0px 0px -10%' }
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
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
    const element = this.el.nativeElement;
    if (this.revealDelay > 0) {
      element.style.animationDelay = `${this.revealDelay}s`;
    }
    this.renderer.addClass(element, 'is-revealed');
  }
}
