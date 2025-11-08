import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { getExperiences } from "../api/api";
import { ExperienceData } from "../types";

export default function ExperienceList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (err) {
        console.error("Erreur de chargement des expériences", err);
      }
    };
    fetchData();
  }, []);

  return (
    <FadeInSection>
      <section
        id="experience"
        className="py-20"
        style={{
          backgroundColor: isDark ? "#0b1220" : "#f8fafc",
          color: isDark ? "#e2e8f0" : "#1e293b",
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="text-4xl font-bold mb-12 text-center"
            style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
          >
            Expériences
          </h2>

          <div className="mt-8 space-y-8">
            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative border-l-4 border-blue-500 pl-4 hover:bg-slate-800/30 rounded transition group cursor-pointer"
                >
                  <div>
                    <h3 className="text-xl font-semibold">
                      {exp.role} — <span className="font-medium">{exp.company}</span>
                    </h3>
                    <p className="text-sm text-gray-400">
                      {exp.start} → {exp.end || "Présent"} • {exp.location}
                    </p>

                    <ul className="list-disc ml-5 mt-2 text-gray-300">
                      {exp.bullets?.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>

                    {exp.tech && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs bg-slate-700 text-gray-200 px-2 py-1 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ✅ Affichage du lien au survol */}
                  {exp.proofLink && (
                    <motion.div
                      className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedProof(exp.proofLink!)}
                    >
                      <span
                        className="text-sm text-blue-400 hover:text-blue-300 underline"
                      >
                        Voir l’attestation
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">Aucune expérience pour le moment.</p>
            )}
          </div>
        </div>

        {/* ✅ Overlay plein écran */}
        <AnimatePresence>
          {selectedProof && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProof(null)}
            >
              {selectedProof.endsWith(".pdf") ? (
                <iframe
                  src={selectedProof}
                  title="Document de preuve"
                  className="w-[90%] h-[80vh] rounded-lg bg-white"
                />
              ) : (
                <img
                  src={selectedProof}
                  alt="Document de preuve"
                  className="max-h-[80vh] rounded-lg shadow-2xl"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </FadeInSection>
  );
}
