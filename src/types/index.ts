// Types pour l'application Opus Advisory

export interface Service {
  id: string;
  title: string;
  description?: string;
  features: string[];
}

export interface ProcessStep {
  id: string;
  icon: string;
  title: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
}

export type TabType = 'entreprises' | 'freelances';

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}