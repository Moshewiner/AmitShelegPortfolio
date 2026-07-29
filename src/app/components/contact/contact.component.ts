import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

/**
 * Reusable "Let's talk" contact card.
 *
 * The phone is an MP4 (white handset on black) composited onto the warm
 * gradient card with `mix-blend-mode: screen` so the black drops out. We never
 * let the browser play it - instead its `currentTime` is *scrubbed* by scroll:
 *
 *   • scrolling DOWN runs the clip from its END to its START,
 *   • scrolling UP runs it back from START to END.
 *
 * A single rAF loop recomputes the scroll-derived target each frame (from the
 * card's live viewport rect, so it is immune to which element actually scrolls -
 * this site scrolls <body>, not the window) and eases a displayed time toward
 * it. The easing is what makes the scrub buttery instead of snapping; a
 * single-seek-in-flight guard avoids queuing overlapping seeks. The loop idles
 * cheaply once settled and the browser pauses rAF entirely when the tab is
 * hidden, so there is nothing to gate manually.
 *
 * `pinned` (used on the dedicated /contact page) wraps the card in a tall
 * scroll track with the card sticky-centered, giving a long, deliberate scrub.
 * Left false on the About page, where the card simply scrubs as it passes by.
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RevealOnScrollDirective],
})
export class ContactComponent implements OnDestroy {
  @Input() pinned = false;

  /**
   * Opts the card into the staged entrance animation (card lifts in, phone
   * swings in and then floats, copy staggers up). Set only by the dedicated
   * /contact page - the About page keeps the plain, unanimated card so the
   * motion stays a property of the page, not of the shared component.
   */
  @Input() animated = false;

  @ViewChild('scrub', { static: true }) scrubRef?: ElementRef<HTMLElement>;
  @ViewChild('video', { static: true }) videoRef?: ElementRef<HTMLVideoElement>;

  readonly phoneDisplay = '+97253-3350577';
  readonly email = 'amitsheleg13@gmail.com';

  /** Which channel was just copied (drives the "Copied to clipboard" tooltip). */
  readonly copied = signal<'phone' | 'email' | null>(null);
  private copiedTimer?: ReturnType<typeof setTimeout>;

  private readonly zone = inject(NgZone);

  /**
   * Experiment toggle. Flip this one constant to switch behaviour:
   *   'loop'  - the clip just autoplays on a continuous muted loop.
   *   'scrub' - playback is tied to scroll position (down = end -> start).
   */
  private readonly mode: 'loop' | 'scrub' = 'loop';

  /** Drives the layout: in loop mode the dedicated page does not need a tall
   *  scroll track, so the card is simply centred in the viewport. */
  get isLoop(): boolean {
    return this.mode === 'loop';
  }

  private rafId = 0;
  private duration = 0;
  private displayedTime = 0; // eased time we are animating toward the target
  private targetTime = 0; // time derived from the current scroll position
  private active = false; // rAF loop is running
  private reduceMotion = false;

  constructor() {
    // Only fires in the browser, so all the window/DOM access below is safe
    // under SSR (where it simply never runs).
    afterNextRender(() => this.setup());
  }

  ngOnDestroy(): void {
    this.stopLoop();
    if (this.copiedTimer !== undefined) {
      clearTimeout(this.copiedTimer);
    }
  }

  /**
   * Copy a channel's value to the clipboard (instead of opening tel:/mailto:)
   * and flash the "Copied to clipboard" tooltip for a moment.
   */
  async copy(value: string, which: 'phone' | 'email'): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for non-secure contexts / older browsers.
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* give up silently */
      }
      document.body.removeChild(ta);
    }

    this.copied.set(which);
    if (this.copiedTimer !== undefined) {
      clearTimeout(this.copiedTimer);
    }
    this.copiedTimer = setTimeout(() => this.copied.set(null), 1800);
  }

  private setup(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) {
      return;
    }

    this.reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Loop mode: autoplay is handled by the template bindings
    // ([autoplay]/[loop]/[muted]), which apply to the live element - imperative
    // play() here can race with Angular hydration swapping the <video> node.
    if (this.mode === 'loop') {
      if (this.reduceMotion) {
        video.pause(); // honour reduced-motion: hold a single frame
      }
      return;
    }

    // ---- Scrub mode: we own the playhead; the browser must never advance it.
    video.pause();

    const onMeta = () => {
      this.duration = Number.isFinite(video.duration) ? video.duration : 0;
      // Rest on the LAST frame: the first thing a downward scroll does is run
      // the clip end -> start.
      this.displayedTime = this.targetTime = this.duration;
      this.safeSeek(this.duration);
    };
    if (video.readyState >= 1 /* HAVE_METADATA */) {
      onMeta();
    } else {
      video.addEventListener('loadedmetadata', onMeta, { once: true });
    }

    if (this.reduceMotion) {
      return; // no scrubbing - just rests on a single frame
    }

    this.startLoop();
  }

  /**
   * Maps scroll position to 0->1 progress, then reverses it into a time so
   * scrolling DOWN runs the clip end -> start.
   *
   * • pinned (dedicated page): progress spans exactly the pinned range - 0 when
   *   the tall track's top hits the viewport top (card starts sticking), 1 when
   *   its bottom reaches the viewport bottom (card unsticks). This plays the
   *   whole clip across the deliberate, sticky scroll.
   * • non-pinned (About page): progress spans the card's full entry->exit
   *   travel through the viewport, so it scrubs naturally as it passes by.
   */
  private updateTarget(): void {
    const scrub = this.scrubRef?.nativeElement;
    if (!scrub || this.duration <= 0) {
      return;
    }
    const rect = scrub.getBoundingClientRect();
    const vh = window.innerHeight;

    let raw: number;
    if (this.pinned && rect.height > vh) {
      raw = -rect.top / (rect.height - vh);
    } else {
      raw = (vh - rect.top) / (rect.height + vh);
    }

    const progress = Math.min(1, Math.max(0, raw));
    this.targetTime = this.duration * (1 - progress);
  }

  private startLoop(): void {
    if (this.active || this.reduceMotion) {
      return;
    }
    this.active = true;
    this.zone.runOutsideAngular(() => {
      this.rafId = requestAnimationFrame(this.tick);
    });
  }

  private stopLoop(): void {
    this.active = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  private readonly tick = (): void => {
    if (!this.active) {
      return;
    }

    // Source of truth, recomputed every frame from the live viewport rect.
    this.updateTarget();

    // Ease toward the target - this is what makes the scrub buttery instead of
    // snapping on every wheel notch. When far off-screen this settles to a
    // resting frame and stops issuing seeks (cheap idle).
    const diff = this.targetTime - this.displayedTime;
    if (Math.abs(diff) < 0.002) {
      this.displayedTime = this.targetTime;
    } else {
      this.displayedTime += diff * 0.14;
    }

    const video = this.videoRef?.nativeElement;
    // Seek only when the frame would actually change. The browser coalesces
    // rapid currentTime writes (a new write supersedes an in-flight seek), so
    // there is no need to track a "seek in flight" flag - and doing so risks
    // deadlocking if a stalled seek's `seeked` event never arrives.
    if (video && Math.abs(this.displayedTime - video.currentTime) > 0.012) {
      this.safeSeek(this.displayedTime);
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  private safeSeek(time: number): void {
    const video = this.videoRef?.nativeElement;
    if (!video || this.duration <= 0) {
      return;
    }
    const clamped = Math.min(this.duration - 0.001, Math.max(0, time));
    try {
      video.currentTime = clamped;
    } catch {
      /* seeking can throw before the media is ready; the next frame retries */
    }
  }
}
