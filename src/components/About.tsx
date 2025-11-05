import { motion } from "framer-motion";
import { Facebook, Github, Linkedin } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              color: isDark ? "#60a5fa" : "#2563eb",
            }}
            className="text-4xl font-bold mb-6"
          >
            À propos de moi
          </motion.h2>

          {/* 🔹 Texte de présentation */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{
              color: isDark ? "#cbd5e1" : "#475569",
            }}
          >
            Je suis un jeune diplômé passionné par le développement full stack
            <span style={{ color: isDark ? "#60a5fa" : "#2563eb" }}> MERN</span>.
            J’aime apprendre, expérimenter et construire des applications modernes,
            performantes et élégantes.
          </motion.p>

          {/* 🔹 Icônes de réseaux sociaux */}
          <div className="flex justify-center mt-8 gap-8">
            <motion.a
              href="https://www.facebook.com/anoir.taktak"
              target="_blank"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="transition-transform"
            >
              <Facebook
                className="w-8 h-8"
                style={{
                  color: isDark ? "#3b82f6" : "#2563eb",
                }}
              />
            </motion.a>

            <motion.a
              href="https://github.com/anoirtaktak"
              target="_blank"
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="transition-transform"
            >
              <Github
                className="w-8 h-8"
                style={{
                  color: isDark ? "#e2e8f0" : "#1e293b",
                }}
              />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/anoirtaktak"
              target="_blank"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="transition-transform"
            >
              <Linkedin
                className="w-8 h-8"
                style={{
                  color: isDark ? "#60a5fa" : "#2563eb",
                }}
              />
            </motion.a>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
