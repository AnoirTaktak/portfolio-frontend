import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { useEffect, useState } from "react";
import api from "../api/api";
// 💡 Import de LocalizedText pour une typage précis dans getText
import { HeroData, AboutData, LocalizedText } from "../types"; 
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language, t } = useLanguage();

  const [hero, setHero] = useState<HeroData | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🧩 Fonction utilitaire corrigée — accepte string ou LocalizedText
  const getText = (value?: string | LocalizedText): string => {
    if (!value) return "";
    if (typeof value === "string") return value; // supporte ancien format
    
    // Le cast est désormais sûr après la correction de LocalizedText dans src/types/index.ts
    const localizedValue = value as Record<string, string | undefined>; 
    
    return localizedValue[language] || localizedValue.fr || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, aboutRes] = await Promise.all([
          api.get("/api/hero"),
          api.get("/api/about"),
        ]);
        setHero(Array.isArray(heroRes.data) ? heroRes.data[0] : heroRes.data);
        setAbout(Array.isArray(aboutRes.data) ? aboutRes.data[0] : aboutRes.data);
      } catch (err: any) {
        console.error(err);
        setError(t("error_loading"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language, t]);

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

  return (
    <FadeInSection>
      <section
        id="hero"
        className={`relative min-h-screen flex flex-col justify-center items-center text-center px-6 transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
            : "bg-gradient-to-b from-white via-gray-100 to-white text-gray-800"
        }`}
      >
        {/* halo derrière */}
        <div
          aria-hidden="true"
          className={`absolute -z-10 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 ${
            isDark ? "bg-blue-500/20" : "bg-blue-300/25"
          }`}
          style={{ top: "8%", left: "50%", transform: "translateX(-50%)" }}
        />

        <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 py-12">
          {/* Texte principal */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 20px rgba(59,130,246,0.8)",
              }}
              className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${
                isDark
                  ? "from-blue-400 via-cyan-300 to-purple-400"
                  : "from-blue-600 via-cyan-500 to-purple-500"
              }`}
            >
              {getText(hero?.title) || "Anoir Taktak"}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className={`text-xl sm:text-2xl md:text-3xl mt-4 ${
                isDark ? "text-slate-300" : "text-gray-600"
              }`}
            >
              {getText(hero?.subtitle) || t("fullstack_developer")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className={`max-w-2xl mt-6 leading-relaxed text-sm sm:text-base md:text-lg ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}
            >
              {getText(hero?.description) || t("hero_description")}
            </motion.p>

            {/* Bouton CV */}
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              {hero?.cvLink && (
                <a
                  href={hero.cvLink}
                  className={`px-6 py-2 border rounded-md transition transform hover:scale-105 ${
                    isDark
                      ? "border-slate-400 text-slate-200 hover:bg-slate-700"
                      : "border-gray-500 text-gray-700 hover:bg-gray-200"
                  }`}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  {t("download_cv")}
                </a>
              )}
            </div>
          </div>

          {/* Image dynamique (depuis About) */}
          <div className="flex-1 flex justify-center md:justify-end">
            <motion.img
              src={about?.imageUrl || "/portrait.jpg"}
              alt="Portrait professionnel"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              className={`w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl border-4 ${
                isDark ? "border-slate-700" : "border-white"
              }`}
            />
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}