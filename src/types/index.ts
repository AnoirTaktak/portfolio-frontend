// src/types/index.ts
export interface LocalizedText {
  // Les clés spécifiques restent pour l'autocomplétion
  fr?: string;
  en?: string;
  de?: string;
  tr?: string;
  
  // 🆕 AJOUT : La signature d'indexation pour autoriser l'accès dynamique
  [key: string]: string | undefined; 
}

export interface HeroData {
// ... (reste inchangé)
  _id?: string;
  title: LocalizedText | string;
  subtitle: LocalizedText | string;
  description: LocalizedText | string;
  cvLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AboutData {
  _id?: string;
  // 💡 description devient multilingue
  description: LocalizedText | string; 
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
  // 💡 role devient multilingue
  role: LocalizedText | string; 
  company: string;
  location?: string;
  start: string;
  end?: string;
  // 💡 bullets devient un tableau de LocalizedText
  bullets?: (LocalizedText | string)[]; 
  tech?: string[];
  proofLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormationData {
 _id?: string;
 // 🚨 CORRECTION : titre doit être LocalizedText | string (pour la flexibilité)
 titre: LocalizedText | string; 
 // 🚨 CORRECTION : lieu doit être LocalizedText | string
 lieu: LocalizedText | string; 
 annee: string;
 lienDiplome?: string;
 lienReleve?: string;
 createdAt?: string;
 updatedAt?: string;
}

export interface ProjectData {
  _id?: string;
  // 💡 Changement de type pour les champs multilingues
  title: LocalizedText; 
  description: LocalizedText;
  // Les autres champs restent inchangés
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}


export type CompType = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS' | 'OTHER';

export interface CompData {
  _id?: string;
  // 💡 Changement de type pour le nom
  name: LocalizedText; 
  // Type de compétence (fixe)
  type: CompType; 
  // Nom de l'icône (string)
  icon?: string; 
}