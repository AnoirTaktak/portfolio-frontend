import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as initialProjects } from "../data/projects";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";

export default function AdminProjects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [projects, setProjects] = useState(initialProjects);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
  });

  const handleAdd = () => {
    if (!newProject.title) return alert("⚠️ Titre requis !");
    const newP = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    setProjects([...projects, newP]);
    setNewProject({ title: "", description: "", technologies: "" });
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <FadeInSection>
      <section
        style={{
          backgroundColor: isDark ? "#0f172a" : "#f8fafc",
          color: isDark ? "#f1f5f9" : "#1e293b",
        }}
        className="p-6 rounded-lg shadow-lg transition-colors duration-500"
      >
        <h2
          style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Gestion des Projets
        </h2>

        {/* Formulaire d'ajout */}
        <div
          className="p-6 rounded-lg shadow-md mb-8"
          style={{
            backgroundColor: isDark
              ? "rgba(30, 41, 59, 0.6)"
              : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3 className="font-semibold mb-3 text-lg">
            Ajouter un nouveau projet
          </h3>

          <div className="grid gap-3">
            <input
              placeholder="Titre du projet"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              style={{
                backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                color: isDark ? "#f8fafc" : "#0f172a",
              }}
              className="w-full p-2 rounded outline-none border border-gray-500/30"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              style={{
                backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                color: isDark ? "#f8fafc" : "#0f172a",
              }}
              className="w-full p-2 rounded outline-none border border-gray-500/30"
            />
            <input
              placeholder="Technologies (séparées par des virgules)"
              value={newProject.technologies}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  technologies: e.target.value,
                })
              }
              style={{
                backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                color: isDark ? "#f8fafc" : "#0f172a",
              }}
              className="w-full p-2 rounded outline-none border border-gray-500/30"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              style={{
                backgroundColor: isDark ? "#3b82f6" : "#2563eb",
              }}
              className="text-white px-4 py-2 rounded-md shadow-md transition"
            >
              ➕ Ajouter le projet
            </motion.button>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="space-y-4">
          <AnimatePresence>
            {projects.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-lg flex justify-between items-start shadow-md"
                style={{
                  backgroundColor: isDark
                    ? "rgba(30, 41, 59, 0.6)"
                    : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div>
                  <h4
                    className="font-bold text-lg"
                    style={{
                      color: isDark ? "#f8fafc" : "#1e293b",
                    }}
                  >
                    {p.title}
                  </h4>
                  <p
                    className="text-sm mt-1"
                    style={{
                      color: isDark ? "#cbd5e1" : "#475569",
                    }}
                  >
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded shadow-sm"
                        style={{
                          backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDelete(p.id)}
                  className="font-medium"
                  style={{
                    color: isDark ? "#f87171" : "#dc2626",
                  }}
                >
                  ❌ Supprimer
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </FadeInSection>
  );
}
