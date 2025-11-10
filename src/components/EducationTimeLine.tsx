import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { FileText, GraduationCap } from "lucide-react";
import { getFormations } from "../api/api";
// Assurez-vous que les types sont importés de la source UNIQUE et correcte
import { useLanguage } from "../context/LanguageContext"; 
import { FormationData, LocalizedText } from "../types"; 

export default function EducationTimeLine() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language, t } = useLanguage(); 

  const [formations, setFormations] = useState<FormationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction utilitaire pour extraire le texte multilingue
  const getText = (value?: string | LocalizedText): string => {
    if (!value) return "";
    if (typeof value === "string") return value;
    
    const localizedValue = value as Record<string, string | undefined>;
    return localizedValue[language] || localizedValue.fr || ""; // Fallback sur le français
  };

  useEffect(() => {
    const fetchFormations = async () => {
      try {
 const data = await getFormations();
 // 🚨 Utilisation d'un double cast (to unknown puis au type final) pour satisfaire l'erreur 2352
 setFormations(Array.isArray(data) ? (data as unknown as FormationData[]) : []);
 setError(null);
      } catch (err) {
        console.error("Erreur de chargement des formations:", err);
        setError(t("error_loading_formations")); 
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, [t]);

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
        {t("loading")} 
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-red-700 text-white">
        {error}
      </section>
    );
  }

  // Si le tableau est vide APRÈS le chargement, on affiche un message
  if (formations.length === 0) {
    return (
        <section 
            id="formations" 
            className="py-20 text-center"
            style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}
        >
            <h2 className="text-4xl font-bold mb-16" style={{ color: isDark ? "#60a5fa" : "#2563eb" }}>
                {t("formations")} 🎓 
            </h2>
            <p className="text-gray-500">{t("no_formations")}</p>
        </section>
    );
  }

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
            {t("formations")} 🎓 
          </h2>

          <div className="relative border-l-2 border-blue-500/40 ml-4">
            {formations.map((f, i) => (
              <motion.div
                key={f._id || i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="mb-10 ml-6 relative"
              >
                {/* ... Reste inchangé ... */}
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
                    {getText(f.titre)} 
                  </h3>
                  <p className="text-sm mt-1 text-gray-400">
                    {getText(f.lieu)} • {f.annee}
                  </p>

                  {(f.lienDiplome || f.lienReleve) && (
                    <div className="mt-4 flex gap-3">
                      {f.lienDiplome && (
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
                          <FileText size={16} /> 
                          {t("view_diploma")} 
                        </a>
                      )}
                      {f.lienReleve && (
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
                          <FileText size={16} /> 
                          {t("view_transcript")} 
                        </a>
                      )}
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