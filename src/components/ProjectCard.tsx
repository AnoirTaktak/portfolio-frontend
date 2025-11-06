import React from "react";
import { motion } from "framer-motion";
import { Project } from "../data/projects";
import { useTheme } from "./ThemeContext";

export default function ProjectCard({ project }: { project?: Project | null }) {
  if (!project) {
    // évite le crash et aide au debug
    console.warn("ProjectCard: missing project prop", project);
    return null; // ou return <div className="p-4">Projet introuvable</div>;
  }

  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    >
      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
      <p className="text-sm text-gray-400 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies?.map((t) => (
          <span key={t} className="text-xs bg-slate-700/60 px-2 py-1 rounded text-gray-100">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-sm">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Code
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
