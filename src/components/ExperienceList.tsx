import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { getExperiences } from "../api/api";
// Assurez-vous que les types sont importés de la source UNIQUE et correcte
import { ExperienceData, LocalizedText } from "../types"; 
import { useLanguage } from "../context/LanguageContext";

export default function ExperienceList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language, t } = useLanguage(); 

  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction utilitaire pour extraire le texte multilingue
  const getText = (value?: string | LocalizedText): string => {
    if (!value) return "";
    if (typeof value === "string") return value;
    
    const localizedValue = value as Record<string, string | undefined>;
    return localizedValue[language] || localizedValue.fr || "";
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperiences();
        // 🚨 CORRECTION CRUCIALE : S'assurer que le type est accepté
        setExperiences(Array.isArray(data) ? (data as ExperienceData[]) : []);
        setError(null);
      } catch (err) {
        console.error("Erreur de chargement des expériences", err);
        setError(t("error_loading_experiences"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [t]); 

  if (loading)
    return <p className="text-center mt-20 text-lg">{t("loading")}</p>;

  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;
    
  // Affiche le message "pas d'expérience" si le tableau est vide
  const hasExperiences = experiences.length > 0;

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
            {t("experience")}
          </h2>

          <div className="mt-8 space-y-8">
            {hasExperiences ? (
              experiences.map((exp) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`relative border-l-4 border-blue-500 pl-4 transition group ${
                    isDark ? "hover:bg-slate-800/30" : "hover:bg-gray-100/50"
                  } rounded cursor-pointer`}
                >
                  {/* ... Reste inchangé ... */}
                  <div>
                    <h3 className="text-xl font-semibold">
                      {getText(exp.role)} — <span className="font-medium">{exp.company}</span>
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {exp.start} → {exp.end || t("present")} • {exp.location}
                    </p>

                    <ul className={`list-disc ml-5 mt-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {exp.bullets?.map((b, i) => (
                        <li key={i}>{getText(b)}</li>
                      ))}
                    </ul>

                    {exp.tech && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className={`text-xs px-2 py-1 rounded ${
                                isDark ? "bg-slate-700 text-gray-200" : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {exp.proofLink && (
                    <motion.div
                      className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedProof(exp.proofLink!)}
                    >
                      <span
                        className="text-sm text-blue-400 hover:text-blue-300 underline"
                      >
                        {t("view_certificate")}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className={`text-center mt-10 ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  {t("no_experience")}
              </p>
            )}
          </div>
        </div>

        {/* ... (Overlay pour l'attestation - Reste inchangé) ... */}
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
                  title={t("proof_document")} 
                  className="w-[90%] h-[80vh] rounded-lg bg-white"
                />
              ) : (
                <img
                  src={selectedProof}
                  alt={t("proof_document")} 
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