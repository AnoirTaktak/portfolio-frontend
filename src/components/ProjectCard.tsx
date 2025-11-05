import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import React from "react";
import type { Project } from "../data/projects";
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
      whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`rounded-xl p-6 shadow-lg transform-gpu transition-all duration-300 ${
        isDark
          ? "bg-slate-800/90 hover:bg-slate-700/90 text-white border border-slate-700"
          : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200"
      }`}
    >
      {/* Titre */}
      <h3
        className={`text-2xl font-semibold mb-2 ${
          isDark ? "text-blue-400" : "text-blue-600"
        }`}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-3 ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-3">
        {project.technologies.map((t) => (
          <motion.span
            whileHover={{ scale: 1.1 }}
            key={t}
            className={`text-xs font-medium px-2 py-1 rounded-full shadow-sm ${
              isDark
                ? "bg-slate-700 text-gray-200"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* Liens GitHub / Demo */}
      <div className="mt-5 flex gap-5 items-center">
        {project.github && (
          <motion.a
            whileHover={{ scale: 1.15, color: "#3b82f6" }}
            href={project.github}
            target="_blank"
            className="flex items-center gap-2 transition"
          >
            <Github className="w-5 h-5" />
            <span>Code</span>
          </motion.a>
        )}

        {project.demo && (
          <motion.a
            whileHover={{ scale: 1.15, color: "#10b981" }}
            href={project.demo}
            target="_blank"
            className="flex items-center gap-2 transition"
          >
            <Globe className="w-5 h-5" />
            <span>Demo</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
