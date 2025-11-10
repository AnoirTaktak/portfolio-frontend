// src/api/api.ts

import axios from "axios";
// Assurez-vous que tous les types sont bien importés de votre fichier de types
import {
  ProjectData,
  FormationData,
  HeroData,
  AboutData,
  LinkData,
  ExperienceData,
  CompData,
  ContactData,
} from "../types/adminData"; 

// Configuration de l'instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// --- FONCTIONS DE CHARGEMENT (GET) ---

export const getHero = async (): Promise<HeroData | null> => {
  const res = await api.get("/api/hero");
  return Array.isArray(res.data) ? res.data[0] : res.data;
};

export const getAbout = async (): Promise<AboutData | null> => {
  const res = await api.get("/api/about");
  return Array.isArray(res.data) ? res.data[0] : res.data;
};

export const getContact = async (): Promise<ContactData | null> => {
  const res = await api.get("/api/contacts"); 
  return Array.isArray(res.data) ? res.data[0] : res.data;
};

export const getLinks = async (): Promise<LinkData[]> => {
  const res = await api.get("/api/links");
  return res.data;
};

export const getExperiences = async (): Promise<ExperienceData[]> => {
  const res = await api.get("/api/experiences");
  return res.data;
};

export const getFormations = async (): Promise<FormationData[]> => {
  const res = await api.get("/api/formations");
  return res.data;
};

export const getProjects = async (): Promise<ProjectData[]> => {
  const res = await api.get("/api/projects");
  return res.data;
};

export const getCompetences = async (): Promise<CompData[]> => {
  const res = await api.get("/api/competences");
  return res.data;
};

// --- FONCTIONS DE SAUVEGARDE (UPDATE/PUT) ---
// Ces fonctions envoient l'objet complet mis à jour par le hook useAdminData

export const updateHero = async (data: HeroData): Promise<HeroData> => {
  const res = await api.put("/api/hero", data);
  return res.data;
};

export const updateAbout = async (data: AboutData): Promise<AboutData> => {
  const res = await api.put("/api/about", data);
  return res.data;
};

export const updateContact = async (data: ContactData): Promise<ContactData> => {
  const res = await api.put("/api/contacts", data);
  return res.data;
};

export const updateLinks = async (data: LinkData[]): Promise<LinkData[]> => {
  const res = await api.put("/api/links", data);
  return res.data;
};

export const updateExperiences = async (data: ExperienceData[]): Promise<ExperienceData[]> => {
  const res = await api.put("/api/experiences", data);
  return res.data;
};

export const updateFormations = async (data: FormationData[]): Promise<FormationData[]> => {
  const res = await api.put("/api/formations", data);
  return res.data;
};

export const updateProjects = async (data: ProjectData[]): Promise<ProjectData[]> => {
  const res = await api.put("/api/projects", data);
  return res.data;
};

export const updateCompetences = async (data: CompData[]): Promise<CompData[]> => {
  const res = await api.put("/api/competences", data);
  return res.data;
};

export default api;