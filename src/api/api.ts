import axios from "axios";
import {ProjectData ,FormationData, HeroData, AboutData, LinkData, ExperienceData } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export const getHero = async (): Promise<HeroData | null> => {
  const res = await api.get("/api/hero");
  return Array.isArray(res.data) ? res.data[0] : res.data;
};

export const getAbout = async (): Promise<AboutData | null> => {
  const res = await api.get("/api/about");
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



// ...

export const getFormations = async (): Promise<FormationData[]> => {
  const res = await api.get("/api/formations");
  return res.data;
};

// …

export const getProjects = async (): Promise<ProjectData[]> => {
  const res = await api.get("/api/projects");
  return res.data;
};


export default api;
