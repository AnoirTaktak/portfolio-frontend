import React from "react";
import { motion } from "framer-motion";
import {  LocalizedText } from "../types"; // Assurez-vous d'importer LocalizedText
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../context/LanguageContext"; // 💡 Importation du contexte de langue

// 💡 Mise à jour des types pour refléter la nouvelle structure
export interface ProjectData {
  _id?: string;
  title: string | LocalizedText; // Peut être une chaîne ou un objet
  description: string | LocalizedText; // Peut être une chaîne ou un objet
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ProjectCard({ project }: { project?: ProjectData | null }) {
  if (!project) return null;

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language, t } = useLanguage(); // 💡 Récupération de la langue et de t()

  // 🧩 Fonction utilitaire pour extraire le texte multilingue
  const getText = (value?: string | LocalizedText): string => {
    if (!value) return "";
    if (typeof value === "string") return value; // Gérer l'ancien format si nécessaire
    
    const localizedValue = value as Record<string, string | undefined>;
    return localizedValue[language] || localizedValue.fr || "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className={`rounded-lg p-4 shadow-md transition transform ${
        isDark ? "bg-slate-800 text-gray-100" : "bg-white text-slate-800"
      }`}
      style={{ border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}` }} // Amélioration visuelle: bordure légère
    >
      {project.image && (
        <img
          src={project.image}
          alt={getText(project.title)} // 💡 Alt text traduit
          className="w-full h-40 object-cover rounded-md mb-3"
          loading="lazy"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">{getText(project.title)}</h3> {/* 💡 Titre traduit */}
      <p className="text-sm text-gray-400 mb-3">{getText(project.description)}</p> {/* 💡 Description traduite */}
      
      {/* 💡 Amélioration visuelle: Mieux adapter le style des technologies au thème */}
      <div className="flex flex-wrap gap-2">
        {project.technologies?.map((t) => (
          <span 
            key={t} 
            className={`text-xs px-2 py-1 rounded font-medium ${
              isDark ? "bg-blue-900/40 text-blue-300" : "bg-blue-100 text-blue-700"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      
      <div className="mt-3 flex gap-4 text-sm font-medium">
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-400 transition" // 💡 Style amélioré
          >
            {t("code")} {/* 💡 Traduction de "Code" */}
          </a>
        )}
        {project.demo && (
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-green-500 hover:text-green-400 transition" // 💡 Style amélioré (vert pour la démo)
          >
            {t("demo")} {/* 💡 Traduction de "Demo" */}
          </a>
        )}
      </div>
    </motion.div>
  );
}