// src/components/Admin/AdminAbout.tsx
import { motion } from "framer-motion";
import { useTheme } from '../ThemeContext';
import { useAdminData } from "../../hooks/useAdminData";
import { AboutData } from "../../types/adminData";
import { LocalizedInput } from "../../context/LocalizedInput";

// Explication : Gère la section À Propos (description multilingue et URL d'image).
export default function AdminAbout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data, updateSection } = useAdminData();
  const aboutData = data.about as AboutData;

  const updateLocalizedField = (lang: string, value: string) => {
    const newLocalizedText = { ...aboutData.description, [lang]: value };
    updateSection('about', { ...aboutData, description: newLocalizedText });
  };

  const inputStyle = `w-full p-3 rounded border focus:ring-2 transition outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-600'}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <h3 className="text-2xl font-semibold text-blue-300 border-b border-slate-700 pb-2">Gérer la Section À Propos</h3>

      {/* 1. Description (Multilingue) */}
      <LocalizedInput
        label="Description Complète de la section À Propos"
        localizedText={aboutData.description}
        onUpdate={updateLocalizedField}
        type="textarea"
        placeholderPrefix="Mon expérience couvre l'ensemble du cycle..."
      />

      {/* 2. URL Image (Statique) */}
      <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50">
        <label className="block text-lg mb-2 text-gray-300">URL de l'Image de Profil</label>
        <input
          value={aboutData.imageUrl}
          onChange={(e) => updateSection('about', { ...aboutData, imageUrl: e.target.value })}
          placeholder="Ex: /assets/profile.jpg"
          className={inputStyle}
        />
      </div>
    </motion.div>
  );
}