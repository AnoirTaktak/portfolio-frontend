import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <FadeInSection>
      <section
        id="hero"
        className={`min-h-screen flex flex-col justify-center items-center text-center px-6 transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
            : "bg-gradient-to-b from-white via-gray-100 to-white text-gray-800"
        }`}
      >
        {/* Nom animé */}
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
          Anoir Taktak
        </motion.h1>

        {/* Sous-titre */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className={`text-xl sm:text-2xl md:text-3xl mt-4 ${
            isDark ? "text-slate-300" : "text-gray-600"
          }`}
        >
          Développeur Full Stack MERN
        </motion.h2>

        {/* Texte descriptif */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className={`max-w-2xl mt-6 leading-relaxed text-sm sm:text-base md:text-lg ${
            isDark ? "text-slate-400" : "text-gray-500"
          }`}
        >
          Je conçois des solutions modernes et performantes combinant React, Node,
          MongoDB et Tailwind. Passionné par l’innovation et le design soigné.
        </motion.p>

        {/* Boutons avec animation hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            href="#projects"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-lg shadow-blue-500/30 transition"
          >
            Voir mes projets
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            href="/CV.pdf"
            className={`px-6 py-2 border font-medium rounded-md shadow-md transition ${
              isDark
                ? "border-slate-400 text-slate-200 hover:bg-slate-700"
                : "border-gray-400 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Télécharger CV
          </motion.a>
        </motion.div>

        {/* Effet de halo lumineux derrière le nom */}
        <div
          className={`absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-30 mt-[-200px] ${
            isDark ? "bg-blue-500/30" : "bg-blue-300/40"
          }`}
        ></div>
      </section>
    </FadeInSection>
  );
}
