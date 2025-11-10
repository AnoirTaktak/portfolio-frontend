// src/types/adminData.ts

export interface LocalizedText {
  fr: string;
  en: string;
  de?: string;
  tr?: string;
  [key: string]: string | undefined; // Permet l'accès dynamique
}

export interface HeroData {
  _id?: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  cvLink: string;
}

export interface AboutData {
  _id?: string;
  description: LocalizedText;
  imageUrl: string;
}

export interface LinkData {
  _id?: string;
  name: string;
  url: string;
  icon: string; 
}

export interface ExperienceData {
  _id?: string;
  role: LocalizedText;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: LocalizedText[]; // Tableau de textes multilingues
  tech: string[];
  proofLink: string;
}

export interface FormationData {
  _id?: string;
  titre: LocalizedText;
  lieu: LocalizedText;
  annee: string;
  lienDiplome: string;
  lienReleve: string;
}

export interface ProjectData {
  _id?: string;
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
}

export type CompType = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS' | 'OTHER';

export interface CompData {
  _id?: string;
  name: LocalizedText;
  type: CompType;
  icon: string;
}

export interface ContactData {
  phone: string;
  email: string;
  adress: string;
}

export interface PortfolioData {
    hero: HeroData;
    about: AboutData;
    links: LinkData[];
    experiences: ExperienceData[];
    formations: FormationData[];
    projects: ProjectData[];
    skills: CompData[];
    contact: ContactData;
}