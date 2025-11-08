import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import FadeInSection from "./FadeInSection";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../api/api";
import { ProjectData } from "../types";

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des projets");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading)
    return (
      <section className="flex justify-center items-center min-h-screen">
        Chargement des projets...
      </section>
    );

  if (error)
    return (
      <section className="flex justify-center items-center min-h-screen text-red-700">
        {error}
      </section>
    );

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
            {projects.length > 0 ? (
              projects.map((project, idx) => (
                <motion.div
                  key={project._id ?? idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: idx * 0.08, duration: 0.45, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  className="will-change-transform"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                Aucun projet disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
