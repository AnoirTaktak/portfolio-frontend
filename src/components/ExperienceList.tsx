import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { GraduationCap, FileText } from "lucide-react";

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
        <div className="max-w-5xl mx-auto px-6 relative">
          <h2
            className="text-4xl font-bold mb-16 text-center"
            style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
          >
            Formations
          </h2>

          {/* Timeline verticale */}
          <div className="relative border-l-2 border-blue-500/40 ml-6">
            {formations.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="mb-12 ml-4 relative"
              >
                {/* Point lumineux sur la timeline */}
                <span
                  className="absolute -left-[1.1rem] top-3 w-4 h-4 rounded-full bg-blue-500 shadow-lg animate-pulse"
                ></span>

                <div
                  className="p-6 rounded-2xl shadow-lg border transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(30, 41, 59, 0.6)"
                      : "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(12px)",
                    borderColor: isDark ? "#334155" : "#cbd5e1",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap
                      className="w-6 h-6"
                      style={{
                        color: isDark ? "#60a5fa" : "#2563eb",
                      }}
                    />
                    <h3 className="text-xl font-semibold">{f.titre}</h3>
                  </div>

                  <p
                    className="text-sm mb-3"
                    style={{ color: isDark ? "#cbd5e1" : "#475569" }}
                  >
                    {f.lieu} • {f.annee}
                  </p>

                  {f.lienDiplome && (
                    <div className="flex gap-4 mt-2">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={f.lienDiplome}
                        target="_blank"
                        className="flex items-center gap-2 px-3 py-1 rounded-md transition shadow-sm"
                        style={{
                          backgroundColor: isDark ? "#1e3a8a" : "#dbeafe",
                          color: isDark ? "#93c5fd" : "#1e40af",
                        }}
                      >
                        <FileText size={18} />
                        Voir Diplôme
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={f.lienReleve}
                        target="_blank"
                        className="flex items-center gap-2 px-3 py-1 rounded-md transition shadow-sm"
                        style={{
                          backgroundColor: isDark ? "#1e40af" : "#e0f2fe",
                          color: isDark ? "#bfdbfe" : "#0369a1",
                        }}
                      >
                        <FileText size={18} />
                        Voir Relevé
                      </motion.a>
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
