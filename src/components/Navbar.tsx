// src/components/Navbar.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, UserCheck } from "lucide-react"; // Import de UserCheck (icône admin)
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "../context/LanguageContext"; 
// import { useAdminData } from "../hooks/useAdminData"; // A utiliser si vous voulez afficher le nom

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { language, changeLanguage, t } = useLanguage(); 
  // const { data } = useAdminData(); // pour afficher le nom du portfolio

  const availableLanguages = [
    { code: 'fr', label: '🇫🇷' }, 
    { code: 'en', label: '🇺🇸' },
    { code: 'de', label: '🇩🇪' },
    { code: 'tr', label: '🇹🇷' },
  ];

  const navItems = [
    { label: t("about"), href: "#about" },
    { label: t("experience"), href: "#experience" },
    { label: t("formations"), href: "#formations" },
    { label: t("projects"), href: "#projects" },
    { label: t("contact"), href: "#contact" },
  ];

  const isDark = theme === "dark";

  // ... (handleNav et handleLanguageChange restent inchangés) ...

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) {
      history.replaceState(null, "", href);
      return;
    }
    const headerOffset = document.querySelector("nav")?.clientHeight || 0;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset - 8;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value as 'fr' | 'en' | 'de' | 'tr');
  };

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
        {/* Nom du Portfolio (Ex: Anoir Taktak, récupéré du hook si nécessaire) */}
        <motion.h1
          whileHover={{ scale: 1.1, color: "#3b82f6" }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            color: isDark ? "#60a5fa" : "#2563eb",
          }}
          className="text-2xl font-extrabold cursor-pointer"
        >
          Anoir Taktak
        </motion.h1>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 items-center">
            {navItems.map((item, i) => (
              <motion.li key={i} whileHover={{ scale: 1.1 }} className="relative group">
                <a href={item.href} onClick={(e) => handleNav(e, item.href)} style={{ color: isDark ? "#e2e8f0" : "#1e293b", }} className="hover:text-blue-500 transition-colors">
                  {item.label} 
                </a>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full" style={{ backgroundColor: isDark ? "#60a5fa" : "#2563eb" }}></span>
              </motion.li>
            ))}
          </ul>
          
          {/* 💡 Icône Admin pour Desktop */}
          <Link 
            to="/admin" 
            className={`transition-colors p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            title={t("admin")} 
          >
            <UserCheck size={24} />
          </Link>

          <select value={language} onChange={handleLanguageChange} className={`p-2 rounded-md focus:outline-none focus:ring-2 appearance-none cursor-pointer ${ isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-500'}`}>
            {availableLanguages.map((langOpt) => (
                <option key={langOpt.code} value={langOpt.code}>
                    {langOpt.label}
                </option>
            ))}
          </select>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-3">
          {/* 💡 Icône Admin pour Mobile */}
          <Link 
            to="/admin" 
            className={`transition-colors p-1 rounded-full ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            title={t("admin")}
          >
            <UserCheck size={24} />
          </Link>

          <select value={language} onChange={handleLanguageChange} className={`p-2 rounded-md focus:outline-none focus:ring-2 text-sm appearance-none cursor-pointer ${ isDark ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-500'}`}>
            {availableLanguages.map((langOpt) => (
                <option key={langOpt.code} value={langOpt.code}>
                    {langOpt.label}
                </option>
            ))}
          </select>
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? ( <X className={`${isDark ? "text-blue-400" : "text-blue-600"} w-7 h-7`} /> ) : ( <Menu className={`${isDark ? "text-blue-400" : "text-blue-600"} w-7 h-7`} /> )}
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t px-6 py-4 space-y-3" style={{ backgroundColor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)", borderColor: isDark ? "#1e293b" : "#d1d5db", }}>
            {navItems.map((item, i) => (
              <a key={i} href={item.href} onClick={(e) => { handleNav(e, item.href); setMenuOpen(false); }} style={{ color: isDark ? "#e2e8f0" : "#1e293b", }} className="block hover:text-blue-500 transition-colors">
                {item.label}
              </a>
            ))}
            {/* L'icône Admin est maintenant dans la barre principale */}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}