import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  const navItems = [
    { label: "À propos", href: "#about" },
    { label: "Expériences", href: "#experience" },
    { label: "Formations", href: "#education" },
    { label: "Projets", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-500"
      style={{
        backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
        borderColor: isDark ? "#1e293b" : "#d1d5db",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* ✅ Logo animé au survol */}
        <motion.h1
          whileHover={{ scale: 1.1, color: "#3b82f6" }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            color: isDark ? "#60a5fa" : "#2563eb",
          }}
          className="text-2xl font-extrabold cursor-pointer"
        >
          Anoir Taktak
        </motion.h1>

        {/* ✅ Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 items-center">
            {navItems.map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <a
                  href={item.href}
                  style={{
                    color: isDark ? "#e2e8f0" : "#1e293b",
                  }}
                  className="hover:text-blue-500 transition-colors"
                >
                  {item.label}
                </a>
                {/* Barre animée sous le texte */}
                <span
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: isDark ? "#60a5fa" : "#2563eb" }}
                ></span>
              </motion.li>
            ))}

            <Link
              to="/admin"
              style={{
                backgroundColor: isDark ? "#3b82f6" : "#2563eb",
              }}
              className="hover:brightness-110 text-white px-4 py-2 rounded-md shadow-md transition"
            >
              Admin
            </Link>
          </ul>

          {/* ✅ Bouton de changement de thème */}
          <ThemeToggle />
        </div>

        {/* ✅ Menu Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className={`${isDark ? "text-blue-400" : "text-blue-600"} w-7 h-7`} />
            ) : (
              <Menu className={`${isDark ? "text-blue-400" : "text-blue-600"} w-7 h-7`} />
            )}
          </button>
        </div>
      </div>

      {/* ✅ Menu mobile déroulant */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t px-6 py-4 space-y-3"
          style={{
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
            borderColor: isDark ? "#1e293b" : "#d1d5db",
          }}
        >
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              style={{
                color: isDark ? "#e2e8f0" : "#1e293b",
              }}
              className="block hover:text-blue-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <Link
            to="/admin"
            style={{
              backgroundColor: isDark ? "#3b82f6" : "#2563eb",
            }}
            className="block hover:brightness-110 text-white px-4 py-2 rounded-md text-center shadow-md transition"
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
