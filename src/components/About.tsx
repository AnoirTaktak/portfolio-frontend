// src/components/About.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { AboutData, LinkData } from "../types";
import { getAbout, getLinks } from "../api/api";
import * as LucideIcons from "lucide-react";

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [about, setAbout] = useState<AboutData | null>(null);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, linksRes] = await Promise.all([getAbout(), getLinks()]);
        setAbout(aboutRes);
        setLinks(linksRes);
      } catch (err) {
        console.error(err);
        setError("Erreur de chargement de la section À propos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-lg">Chargement...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <FadeInSection>
      <section
        id="about"
        className="py-20 transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "#0f172a" : "#f8fafc",
          color: isDark ? "#e2e8f0" : "#1e293b",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* 🔹 Titre */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
            style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
          >
            À propos de moi
          </motion.h2>

          {/* 🔹 Description dynamique */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{
              color: isDark ? "#cbd5e1" : "#475569",
            }}
          >
            {about?.description ||
              "Passionné par le développement web moderne, je conçois des solutions performantes et élégantes."}
          </motion.p>


          {/* 🔹 Liens sociaux dynamiques */}
          <div className="flex justify-center mt-10 gap-8">
  {(() => {
    // ✅ Cast propre pour TypeScript
    const LucideIconSet = LucideIcons as unknown as Record<string, React.ComponentType<any>>;

    return links.map((link) => {
      const IconComponent = LucideIconSet[link.icon || "Link"] || LucideIconSet.Link;

      return (
        <motion.a
          key={link._id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="transition-transform"
        >
          <IconComponent
            className="w-8 h-8"
            style={{
              color: isDark ? "#60a5fa" : "#2563eb",
            }}
          />
        </motion.a>
      );
    });
  })()}
</div>

        </div>
      </section>
    </FadeInSection>
  );
}
