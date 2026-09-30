// The case-study cards shown in the home page grid. Kept here rather than in the
// home component so the prev/next nav can reuse the same list and column split
// without importing a component (base-page already imports project-nav, so the
// other direction would be a cycle).

/** A card in the home page project grid. */
export interface HomeProjectCard {
  image: string;
  name: string;
  title: string;
  /** Empty for projects with no case-study page (e.g. confidential work). */
  link: string;
  badge?: 'new' | 'confidential';
}

export const HOME_PROJECTS: HomeProjectCard[] = [
  {
    image: '/assets/cargo/preview.webp',
    name: 'EL AL CARGO',
    title: `Redesigning and Refining [El Al] Cargo's Website & App`,
    link: '/elal-cargo',
  },
  {
    image: '/assets/routines/preview.webp',
    name: 'ROUTINES.AI',
    title: `Leading the Design of an Orchestration & Scheduling Platform`,
    link: '/routines',
    badge: 'new',
  },
  {
    image: '/assets/shahaf-gov/shahaf-preview.webp',
    name: 'GOV.IL - SHAHAF',
    title: 'Simplifying Freedom of Information (FOI) Requests Management',
    link: '/gov-shahaf',
  },
  {
    image: '/assets/globaly/preview.webp',
    name: 'EL AL GLOBALY',
    title: `Smarter Tools for El Al's Airport Operations`,
    link: '/elal-globaly',
  },
  {
    image: '/assets/clalit/preview.webp',
    name: 'CLALIT',
    title: `Enhancing Clalit's Workshop Registration Experience`,
    link: '/clalit',
  },
  {
    image: '/assets/applied-materials/preview.webp',
    name: 'APPLIED MATERIALS',
    title: 'Design System Migration and Product Design',
    link: '',
    badge: 'confidential',
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

/**
 * The two grid columns, exactly as the home page renders them: cards alternate
 * between the columns, starting on the left.
 */
export function homeProjectColumns(): { left: HomeProjectCard[]; right: HomeProjectCard[] } {
  return {
    left: HOME_PROJECTS.filter((_, index) => index % 2 === 0),
    right: HOME_PROJECTS.filter((_, index) => index % 2 === 1),
  };
}

/**
 * The cards in the order they read on screen: one from each column at a time,
 * left to right, row by row. Built by walking the rendered columns rather than
 * HOME_PROJECTS itself, so if the column split ever changes, the reading order
 * follows it instead of quietly disagreeing.
 */
export function homeReadingOrder(): HomeProjectCard[] {
  const { left, right } = homeProjectColumns();
  const order: HomeProjectCard[] = [];

  for (let row = 0; row < Math.max(left.length, right.length); row++) {
    if (left[row]) {
      order.push(left[row]);
    }
    if (right[row]) {
      order.push(right[row]);
    }
  }

  return order;
}
