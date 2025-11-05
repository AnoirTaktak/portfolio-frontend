import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Wrench,
} from "lucide-react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaNodeJs,
  FaGithub,
  FaTools,
} from "react-icons/fa";
import {
  SiMongodb,
  SiPostman,
  SiVercel,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
} from "react-icons/si";
import { useTheme } from "./ThemeContext";
import FadeInSection from "./FadeInSection";

export default function Skills() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const categories = [
    {
      title: "Frontend",
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      skills: [
        { name: "React", icon: <FaReact className="text-cyan-400 w-5 h-5" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-500 w-5 h-5" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400 w-5 h-5" /> },
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500 w-5 h-5" /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-500 w-5 h-5" /> },
        { name: "JavaScript (ES6+)", icon: <FaJsSquare className="text-yellow-400 w-5 h-5" /> },
      ],
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-400 w-5 h-5" /> },
        { name: "Express.js", icon: <SiExpress className="text-gray-300 w-5 h-5" /> },
        { name: "API REST", icon: <FaTools className="text-cyan-400 w-5 h-5" /> },
      ],
    },
    {
      title: "Base de données",
      icon: <Database className="w-6 h-6 text-green-400" />,
      skills: [
        { name: "MongoDB", icon: <SiMongodb className="text-green-500 w-5 h-5" /> },
        { name: "SQL / MySQL", icon: <Database className="text-blue-400 w-5 h-5" /> },
      ],
    },
    {
      title: "Outils et autres",
      icon: <Wrench className="w-6 h-6 text-yellow-400" />,
      skills: [
        { name: "Git & GitHub", icon: <FaGithub className="text-slate-300 w-5 h-5" /> },
        { name: "VS Code", icon: <FaTools className="text-slate-300 w-5 h-5" /> },
        { name: "Postman", icon: <SiPostman className="text-orange-400 w-5 h-5" /> },
        { name: "Vercel / Render", icon: <SiVercel className="text-white w-5 h-5" /> },
      ],
    },
  ];

  return (
    <FadeInSection>
      <section
        id="skills"
        className={`py-20 transition-colors duration-700 ${
          isDark ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl font-bold mb-12 text-center ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Compétences Techniques
          </motion.h2>

          {/* ✅ Grille animée et responsive */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{
                  y: -8,
                  boxShadow: isDark
                    ? "0 10px 25px rgba(59,130,246,0.3)"
                    : "0 10px 25px rgba(37,99,235,0.2)",
                }}
                className={`p-6 rounded-2xl shadow-md border transition-transform duration-300 ${
                  isDark
                    ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                    : "bg-white border-gray-200 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {cat.icon}
                  <h3 className="text-xl font-semibold">{cat.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.skills.map((skill, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm group transition-all duration-300"
                    >
                      <span className="group-hover:scale-125 transition-transform">
                        {skill.icon}
                      </span>
                      <span
                        className={`group-hover:text-blue-400 ${
                          isDark ? "text-slate-300" : "text-gray-700"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
