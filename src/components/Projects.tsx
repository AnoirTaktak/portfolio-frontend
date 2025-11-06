import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project, projects } from "../data/projects";
import { useTheme } from "./ThemeContext";
import ProjectCard from "./ProjectCard";
import FadeInSection from "./FadeInSection"; // <-- ajout

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <FadeInSection>
      <section
        id="projects"
        className="py-20"
        style={{
          backgroundColor: isDark ? "#0b1220" : "#f8fafc",
          color: isDark ? "#e2e8f0" : "#1e293b",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
          >
            Projets
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project, idx) =>
                project ? (
                  <motion.div
                    key={project.id ?? idx}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: idx * 0.08, duration: 0.45, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    className="will-change-transform"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ) : null
              )
            ) : (
              <p className="text-gray-500">Aucun projet disponible pour le moment.</p>
            )}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
