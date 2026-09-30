// Previous/next navigation between case studies, shown at the end of a project
// page. The order follows the home page grid as it reads on screen — one card
// from each column at a time, left to right, row by row — so moving a card in
// the grid moves it here too. Card content still comes from PROJECTS.
import { PROJECTS } from './projects';
import { homeReadingOrder } from './home-projects';

/** Just enough of a project to render a prev/next nav card. */
export interface ProjectNavItem {
  link: string;
  client: string;
  title: string;
  image: string;
}

/**
 * Published case studies in home page reading order.
 *
 * Cards without a case-study page (confidential work) are skipped. Any project
 * in PROJECTS that isn't on the home grid is appended at the end rather than
 * dropped, so a project page can never end up with no nav at all.
 */
function navOrder(): string[] {
  const fromGrid = homeReadingOrder()
    .map((card) => card.link)
    .filter((link) => link in PROJECTS);

  const ungridded = Object.keys(PROJECTS).filter((link) => !fromGrid.includes(link));

  return [...fromGrid, ...ungridded];
}

/**
 * The case studies either side of `link`, wrapping around the list so a project
 * page always offers both directions. Null for links that aren't published case
 * studies (or if there's only one project to move between).
 */
export function getProjectNav(link: string): { prev: ProjectNavItem; next: ProjectNavItem } | null {
  const links = navOrder();
  const index = links.indexOf(link);
  if (index === -1 || links.length < 2) {
    return null;
  }

  const at = (i: number): ProjectNavItem => {
    const neighborLink = links[(i + links.length) % links.length];
    const project = PROJECTS[neighborLink];
    return {
      link: neighborLink,
      client: project.client,
      title: project.title,
      image: project.heroImage,
    };
  };

  return { prev: at(index - 1), next: at(index + 1) };
}
