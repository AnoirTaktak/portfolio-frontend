import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project, projects } from "../data/projects";
import { useTheme } from "./ThemeContext";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="projects" className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Projets</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project, idx) =>
              project ? (
                <ProjectCard key={project.id ?? idx} project={project} />
              ) : null
            )
          ) : (
            <p className="text-gray-500">Aucun projet disponible pour le moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}
