import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { Facebook, Github, Linkedin } from "lucide-react";
import { useTheme } from "./ThemeContext";
// Assurez-vous d'importer useLanguage et t si vous souhaitez traduire le texte
// import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  // const { t } = useLanguage();

  return (
    <FadeInSection>
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`py-8 mt-10 backdrop-blur-md border-t transition-colors duration-500 ${
          isDark
            ? "bg-slate-900/80 border-slate-700 text-gray-300"
            : "bg-white/60 border-gray-200 text-gray-600"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Texte */}
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-blue-400 dark:text-blue-600">
              Anoir Taktak
            </span>{" "}
            — Portfolio MERN
          </p>

          {/* Icônes sociales */}
          <div className="flex gap-5">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://www.facebook.com/anoir.taktak"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <Facebook size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://github.com/anoirtaktak"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 dark:hover:text-white transition"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://linkedin.com/in/anoirtaktak"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Linkedin size={20} />
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </FadeInSection>
  );
}