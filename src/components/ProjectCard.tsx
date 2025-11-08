import React from "react";
import { motion } from "framer-motion";
import { ProjectData } from "../types"; // ✅ utilise le type global
import { useTheme } from "./ThemeContext";

export default function ProjectCard({ project }: { project?: ProjectData | null }) {
  if (!project) return null;

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
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover rounded-md mb-3"
          loading="lazy"
        />
      )}
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
