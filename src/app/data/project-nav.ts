// Previous/next navigation between case studies, shown at the end of a project
// page. Ordering and content both come from PROJECTS, so adding a project there
// is all it takes to put it in the rotation.
import { PROJECTS } from './projects';

/** Just enough of a project to render a prev/next nav card. */
export interface ProjectNavItem {
  link: string;
  client: string;
  title: string;
  image: string;
}

/**
 * The case studies either side of `link`, wrapping around the list so a project
 * page always offers both directions. Null for links that aren't published case
 * studies (or if there's only one project to move between).
 */
export function getProjectNav(link: string): { prev: ProjectNavItem; next: ProjectNavItem } | null {
  const links = Object.keys(PROJECTS);
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
