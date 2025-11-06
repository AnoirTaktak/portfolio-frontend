import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import portrait from "../assets/portrait.jpg"; // <-- ajouter fichier ou utiliser '/portrait.jpg'

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
        {/* halo behind */}
        <div
          aria-hidden="true"
          className={`absolute -z-10 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 ${
            isDark ? "bg-blue-500/20" : "bg-blue-300/25"
          }`}
          style={{ top: "8%", left: "50%", transform: "translateX(-50%)" }}
        />

        <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 py-12">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* titre / textes (inchangés) */}
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
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <motion.img
              src={portrait}
              alt="Portrait professionnel d'Anoir Taktak"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl border-4"
            />
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
