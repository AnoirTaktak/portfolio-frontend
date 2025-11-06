import React from "react";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import { useTheme } from "./ThemeContext";
import { experiences } from "../data/experience";

export default function ExperienceList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
            Expériences
          </h2>

          <div className="mt-8 space-y-6">
            {Array.isArray(experiences) && experiences.length > 0 ? (
              experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-l-4 border-blue-500 pl-4 hover:bg-slate-800/30 rounded transition"
                >
                  <h3 className="text-xl font-semibold">
                    {exp.role} —{" "}
                    <span className="font-medium">{exp.company}</span>
                  </h3>
                  <p className="text-sm text-gray-400">
                    {exp.start} → {exp.end || "Présent"} • {exp.location}
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-gray-300">
                    {exp.bullets?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  {exp.tech && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-slate-700 text-gray-200 px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">Aucune expérience pour le moment.</p>
            )}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
