import { Mail, Phone, MapPin, Copy, Facebook, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../context/LanguageContext"; // Importation essentielle pour 't()'

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  // Fonction de traduction
  const { t } = useLanguage(); 

  const [copied, setCopied] = useState(false);

  // Coordonnées réelles basées sur votre CV
  const emailAddress = "Anoirtaktak@hotmail.fr"; 
  const phoneNumber = "+216 29 036 555";
  const address = "Sfax, Tunisie";
  
  const handleCopy = (text: string) => {
    // Utiliser l'API du presse-papiers
    navigator.clipboard.writeText(text);
    setCopied(true);
    // Masquer le message "Copié" après 1,5 seconde
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <FadeInSection>
      <section
        id="contact"
        className="py-20 flex justify-center items-center transition-colors duration-500"
        style={{
          // Styles d'arrière-plan basés sur le thème
          backgroundColor: isDark ? "#0f172a" : "#f8fafc",
          color: isDark ? "#e2e8f0" : "#1e293b",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl max-w-lg w-full text-center shadow-xl border transition-all duration-500"
          style={{
            // Styles de la carte de contact (avec effet de flou pour l'esthétique)
            backgroundColor: isDark
              ? "rgba(30, 41, 59, 0.6)"
              : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(12px)",
            borderColor: isDark ? "#334155" : "#e2e8f0",
          }}
        >
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
          >
            {/* Utilisation de la clé de traduction */}
            {t("contact_title")} 
          </h2>

          <div className="space-y-4 text-base">
            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center items-center gap-2"
            >
              <Mail className="text-blue-400" />
              <span>{emailAddress}</span>
              <Copy
                className="cursor-pointer hover:text-blue-400 transition"
                size={18}
                onClick={() => handleCopy(emailAddress)}
                aria-label={t("copy_email")}
              />
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-400 text-sm ml-2"
                >
                  {t("copied_success")}
                </motion.span>
              )}
            </motion.div>

            {/* Téléphone (lien cliquable pour appeler) */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="flex justify-center items-center gap-2"
            >
              <Phone className="text-blue-400" />
              <span>{phoneNumber}</span>
            </motion.a>

            {/* Adresse */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center items-center gap-2"
            >
              <MapPin className="text-blue-400" />
              <span>{address}</span>
            </motion.div>
          </div>

          {/* Liens sociaux (Uniformisés avec Lucide Icons) */}
          <div className="flex justify-center mt-8 space-x-6">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://www.facebook.com/anoir.taktak"
              target="_blank"
              rel="noopener noreferrer"
              className="transition text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Facebook size={30} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              href="https://github.com/anoirtaktak"
              target="_blank"
              rel="noopener noreferrer"
              className="transition text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Github size={30} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://www.linkedin.com/in/anoirtaktak"
              target="_blank"
              rel="noopener noreferrer"
              className="transition text-gray-500 hover:text-blue-700 dark:hover:text-blue-500"
            >
              <Linkedin size={30} />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </FadeInSection>
  );
}