import { Mail, Phone, MapPin, Copy } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <FadeInSection>
      <section
        id="contact"
        className="py-20 flex justify-center items-center transition-colors duration-500"
        style={{
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
            Contact
          </h2>

          <div className="space-y-4 text-base">
            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center items-center gap-2"
            >
              <Mail className="text-blue-400" />
              <span>anoir.taktak@example.com</span>
              <Copy
                className="cursor-pointer hover:text-blue-400 transition"
                size={18}
                onClick={() => handleCopy("anoir.taktak@example.com")}
              />
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-400 text-sm ml-2"
                >
                  Copié ✅
                </motion.span>
              )}
            </motion.div>

            {/* Téléphone */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center items-center gap-2"
            >
              <Phone className="text-blue-400" />
              <span>+216 55 123 456</span>
            </motion.div>

            {/* Adresse */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-center items-center gap-2"
            >
              <MapPin className="text-blue-400" />
              <span>Tunis, Tunisie</span>
            </motion.div>
          </div>

          {/* Liens sociaux */}
          <div className="flex justify-center mt-8 space-x-6">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://www.facebook.com/anoir.taktak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fa-brands fa-facebook text-3xl transition"
                style={{ color: isDark ? "#3b82f6" : "#1877F2" }}
              ></i>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              href="https://github.com/anoirtaktak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fa-brands fa-github text-3xl transition"
                style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
              ></i>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="https://www.linkedin.com/in/anoirtaktak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="fa-brands fa-linkedin text-3xl transition"
                style={{ color: isDark ? "#60a5fa" : "#0A66C2" }}
              ></i>
            </motion.a>
          </div>
        </motion.div>
      </section>
    </FadeInSection>
  );
}
