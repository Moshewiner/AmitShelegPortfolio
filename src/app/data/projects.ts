// Single source of truth for project case-study content. Used by both the
// desktop route pages (app-base-page) and the mobile home modal, so the two
// always show identical data (same hero, metadata, and full image set).
export interface Project {
  title: string;
  description: string;
  heroImage: string;
  client: string;
  duration: string;
  platform: string;
  introduction: string;
  content: { images: string[] };
}

export const PROJECTS: Record<string, Project> = {
  '/elal-cargo': {
    title: `Redesigning and Refining [El Al] Cargo's Website & App`,
    description:
      'Transforming complex cargo processes into a clear, accessible digital journey for [El Al] Cargo’s global clients.',
    heroImage: '/assets/Cargo/wide.webp',
    client: 'El Al Israel Airlines',
    duration: '8 Months',
    platform: 'Desktop, Mobile, Native Mobile App',
    introduction: `El Al Cargo specializes in transporting a wide variety of commercial shipments worldwide, offering unique, end-to-end solutions for every client. From airport pickup to final delivery, the service emphasizes safety, reliability, and a personal touch.<br /><br />My role involved leading the redesign of El Al Cargo’s website, along with creating a new native mobile app. Focusing on UX strategy, I improved key flows and crafted a clean, intuitive interface that follows the brand’s visual identity. The product was developed in-house through close collaboration between the design and development team, working directly with project managers and El Al Cargo’s stakeholders.`,
    content: {
      images: [
        '/assets/Cargo/01HP.webp',
        '/assets/Cargo/02SR.webp',
        '/assets/Cargo/03HP-BA.webp',
        '/assets/Cargo/04FS-BA.webp',
        '/assets/Cargo/05CP.webp',
        '/assets/Cargo/06BI.webp',
        '/assets/Cargo/07DS.webp',
        '/assets/Cargo/08Web.webp',
        '/assets/Cargo/09App.webp',
      ],
    },
  },
  '/gov-shahaf': {
    title: 'Simplifying Freedom of Information (FOI) Requests Management',
    description:
      'Creating a simple and efficient system for public authorities to manage FOI requests through a focused, digital-first approach.',
    heroImage: '/assets/Shahaf-gov/shahaf-wide.webp',
    client: 'Gov.il - National Digital Agency',
    duration: 'One Year',
    platform: 'Desktop',
    introduction: `Shahaf is a BackOffice system designed to manage Freedom of Information (FOI) requests across public authorities.
                  <br /><br />
                  The system allows users to receive, enter, and manage requests - including cost calculations, documentation management, decision-making, coordination with third party consultants, as well as with the requesters themselves.
                  <br /><br />
                  Shahaf digitizes the FOI process, making it faster, transparent, and more efficient - enabling public sector organizations to improve oversight, service, and daily operations.
`,
    content: {
      images: [
        '/assets/Shahaf-gov/01MT.webp',
        '/assets/Shahaf-gov/02BC.webp',
        '/assets/Shahaf-gov/03BD.webp',
        '/assets/Shahaf-gov/04BF.webp',
        '/assets/Shahaf-gov/05DB.webp',
        '/assets/Shahaf-gov/06CM.webp',
        '/assets/Shahaf-gov/07Web.webp',
      ],
    },
  },
  '/elal-globaly': {
    title: `Smarter Tools for El Al's Airport Operations`,
    description: `A global back-office platform that streamlines station management, simplifies daily workflows, and saves time and resources across El Al’s operations.`,
    heroImage: '/assets/GlobaLY/wide.webp',
    client: 'El Al Israel Airlines',
    duration: 'Three Years+ (ongoing)',
    platform: 'Native iOS App for iPad',
    introduction: `GlobalLY is a back-office application created to optimize the daily operations of El Al’s station managers across the globe. Designed as a single hub for flight operations, station information, crew assignments and more - the system replaces manual processes with a streamlined digital workflow.<br /><br />I led the project end-to-end, from mapping workflows and creating detailed wireframes, to delivering a production-ready product design. The interface was crafted in line with El Al’s brand guidelines, ensuring visual consistency across the company’s digital ecosystem. Throughout the process, I collaborated closely with project managers, system analysts, and the development team, while testing early prototypes directly with field managers.<br /><br />One of the key challenges was designing for non-technical users who primarily access the system on tablets, often in time-sensitive environments. By prioritizing clarity and accessibility, I ensured that even complex tasks could be performed in just a few taps.<br /><br />The outcome is a fully deployed solution, now used daily by El Al station managers worldwide. In pilot-phase interviews, station managers highlighted the system’s simplicity and efficiency.Most importantly, GlobalLY saves each station manager more than 10 hours of manual work every week - optimizing time and costs across El Al’s global operations.`,
    content: {
      // Empty on purpose: an empty gallery renders the "coming soon" empty state.
      images: [],
    },
  },
  '/routines': {
    title: 'Leading the Design of an Orchestration & Scheduling Platform',
    description:
      'Transforming a complex enterprise platform through modern UX, continuous innovation, and AI-driven experiences.',
    heroImage: '/assets/Routines/wide.png',
    client: 'Routines.ai',
    duration: '9 Months+ (ongoing)',
    platform: 'Desktop SaaS',
    introduction: `Routines is an enterprise orchestration and scheduling platform that helps organizations automate processes, manage complex workflows, and coordinate operational activities from a single centralized system. The platform is actively used in production by leading organizations across Israel (Rafael, Harel Insurance, Soreq, and others).<br /><br />Since joining the team, I have played an active role in the ongoing evolution of the product by designing new features, modernizing existing workflows, and continuously improving usability, efficiency, and the overall user experience.<br /><br />Working closely with the development team, product stakeholders, and CEO, allows me to identify opportunities for improvement, align business and user needs, and drive the product forward through new features and enhanced user experiences.<br /><br />One of the most rewarding challenges throughout the project is making powerful automation and AI capabilities feel approachable, accessible, and easy to use, while maintaining the flexibility and depth required by enterprise users.`,
    content: {
      // Empty on purpose: an empty gallery renders the "coming soon" empty state.
      images: [],
    },
  },
  '/clalit': {
    title: `Enhancing Clalit's Workshop Registration Experience`,
    description: 'Adapting Clalit’s workshop registration into a seamless mobile experience.',
    heroImage: '/assets/Clalit/wide.webp',
    client: 'Clalit Health Services',
    duration: 'One Month',
    platform: 'Mobile Adaptation',
    introduction: `Clalit Health Services launched a new website to improve services for its customers. <br />
The purpose of the website is to enable registration for health-improvement workshops, both in-person and online.<br /><br /> 

The project was done in collaboration with a fellow designer from my team, and my role was to adapt the desktop design into a fully responsive mobile version. The site is now live and serves Clalit’s customers with a smooth and accessible registration experience across devices.`,
    content: {
      // Empty on purpose: an empty gallery renders the "coming soon" empty state.
      images: [],
    },
  },
};

export function getProject(link: string): Project | null {
  return PROJECTS[link] ?? null;
}
