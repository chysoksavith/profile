import raw from '@/data/data.json';

/**
 * Types for `data/data.json`.
 *
 * All site content lives in that file — edit it and the whole page updates.
 * The assignment at the bottom type-checks the JSON against these shapes at
 * build time, so a typo or missing field fails the build instead of the page.
 */

export interface Site {
  /** Absolute site URL, e.g. "https://example.com". Leave empty if unknown. */
  url: string;
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  /** Monogram fallback used when `avatar` is empty, e.g. "CS". */
  initials: string;
  /** Path inside `public/`, e.g. "/profile.jpg". Empty falls back to initials. */
  avatar: string;
  role: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  github: string;
  /** Path or URL to a CV. Leave empty to hide the download button. */
  resumeUrl: string;
  /** Toggles the "available" pill in the intro. */
  available: boolean;
  availability: string;
  summary: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  startDate: string;
  description: string;
  /** Tech used in the role, shown as tags under the description. */
  stack?: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Leave empty to hide the source link (e.g. private client work). */
  github: string;
  /** Leave empty to hide the live preview link. */
  demo: string;
  /** Gives the project a full-width card at the top of the grid. */
  featured?: boolean;
  /** Accented badge next to the title, e.g. "In progress". */
  status?: string;
  role?: string;
  period?: string;
  /** Bullet points rendered under the description. */
  highlights?: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  /** "In progress" renders as an accented badge; anything else is neutral. */
  status: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface PortfolioData {
  site: Site;
  profile: Profile;
  nav: NavItem[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  languages: Language[];
  contact: { heading: string; intro: string };
  footer: { note: string };
}

export const data: PortfolioData = raw;

export const { site, profile, nav, contact, footer } = data;

/** `tel:` links can't contain spaces. */
export const telHref = `tel:${profile.phone.replace(/[^\d+]/g, '')}`;
export const mailtoHref = `mailto:${profile.email}`;

/** "https://github.com/chysoksavith" -> "github.com/chysoksavith" */
export const githubHandle = profile.github.replace(/^https?:\/\//, '').replace(/\/$/, '');
