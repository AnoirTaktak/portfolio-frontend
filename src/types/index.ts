// src/types/index.ts
export interface HeroData {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  cvLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AboutData {
  _id?: string;
  description?: string;
  imageUrl?: string;
}

export interface LinkData {
  _id?: string;
  name: string;
  url: string;
  icon?: string; // exemple : "Github", "Linkedin", etc.
}


export interface ExperienceData {
  _id?: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end?: string;
  bullets?: string[];
  tech?: string[];
  proofLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormationData {
  _id?: string;
  titre: string;
  lieu: string;
  annee: string;
  lienDiplome?: string;
  lienReleve?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectData {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
