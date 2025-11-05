import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { FileText, GraduationCap } from "lucide-react";

export default function EducationTimeLine() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const formations = [
    {
      titre: "Master Professionnel en Génie Logiciel",
      lieu: "ISET Sfax",
      annee: "2024",
      lienDiplome: "/docs/diplome.pdf",
      lienReleve: "/docs/releve.pdf",
    },
    {
      titre: "Licence en Technologies de l’Informatique",
      lieu: "ISET Sfax",
      annee: "2022",
    },
  ];

  return (
    <FadeInSection>
      <section
        id="formations"
        className="py-20 transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "#0f172a" : "#f8fafc",
          color: isDark ? "#e2e8f0" : "#1e293b",
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="text-4xl font-bold mb-16 text-center"
            style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
          >
            Formations 🎓
          </h2>

          <div className="relative border-l-2 border-blue-500/40 ml-4">
            {formations.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="mb-10 ml-6 relative"
              >
                {/* Point de timeline */}
                <span
                  className="absolute -left-[15px] top-2 w-4 h-4 rounded-full border-4"
                  style={{
                    backgroundColor: isDark ? "#60a5fa" : "#2563eb",
                    borderColor: isDark ? "#0f172a" : "#f8fafc",
                  }}
                ></span>

                <div
                  className="p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(30, 41, 59, 0.7)"
                      : "rgba(255, 255, 255, 0.9)",
                    border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <h3
                    className="text-xl font-semibold flex items-center gap-2"
                    style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}
                  >
                    <GraduationCap
                      className="text-blue-400"
                      size={22}
                    />
                    {f.titre}
                  </h3>
                  <p className="text-sm mt-1 text-gray-400">
                    {f.lieu} • {f.annee}
                  </p>

                  {f.lienDiplome && (
                    <div className="mt-4 flex gap-3">
                      <a
                        href={f.lienDiplome}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-md transition"
                        style={{
                          backgroundColor: isDark ? "#1e3a8a" : "#3b82f6",
                          color: "white",
                        }}
                      >
                        <FileText size={16} /> Voir Diplôme
                      </a>
                      <a
                        href={f.lienReleve}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-md transition"
                        style={{
                          backgroundColor: isDark ? "#2563eb" : "#60a5fa",
                          color: "white",
                        }}
                      >
                        <FileText size={16} /> Voir Relevé
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
