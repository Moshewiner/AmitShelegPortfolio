import { RenderMode, ServerRoute } from '@angular/ssr';

// Only the home page is prerendered to static HTML (so it paints instantly on
// mobile). The app uses hash routing, so this single prerendered index.html
// serves every entry point; the project/detail pages render on the client
// (they rely on browser-only APIs and animations).
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
