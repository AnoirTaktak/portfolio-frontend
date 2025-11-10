// src/components/Admin/AdminHero.tsx
import { motion } from "framer-motion";
import { useTheme } from '../ThemeContext';
import { useAdminData } from "../../hooks/useAdminData";
import { HeroData } from "../../types/adminData";
import { LocalizedInput } from "../../context/LocalizedInput";

// Explication : Gère la section statique Hero, principalement des champs multilingues.
export default function AdminHero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data, updateSection } = useAdminData();
  const heroData = data.hero as HeroData;

  const updateLocalizedField = (field: keyof Omit<HeroData, 'cvLink' | '_id'>, lang: string, value: string) => {
    const currentLocalizedText = heroData[field];
    const newLocalizedText = { ...currentLocalizedText, [lang]: value };
    updateSection('hero', { ...heroData, [field]: newLocalizedText });
  };

  const inputStyle = `w-full p-3 rounded border focus:ring-2 transition outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-600'}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <h3 className="text-2xl font-semibold text-blue-300 border-b border-slate-700 pb-2">Gérer la Section Héros</h3>

      {/* 1. Titre (Multilingue) */}
      <LocalizedInput
        label="Titre Principal"
        localizedText={heroData.title}
        onUpdate={(lang, value) => updateLocalizedField('title', lang, value)}
        placeholderPrefix="Développeur Full Stack"
      />

      {/* 2. Sous-Titre (Multilingue) */}
      <LocalizedInput
        label="Sous-Titre / Technologies Clés"
        localizedText={heroData.subtitle}
        onUpdate={(lang, value) => updateLocalizedField('subtitle', lang, value)}
        placeholderPrefix="MERN Stack | .Net | Symfony"
      />

      {/* 3. Description (Multilingue) */}
      <LocalizedInput
        label="Description / Phrase d'Accroche"
        localizedText={heroData.description}
        onUpdate={(lang, value) => updateLocalizedField('description', lang, value)}
        type="textarea"
        placeholderPrefix="Je conçois des solutions modernes..."
      />

      {/* 4. Lien CV (Statique) */}
      <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50">
        <label className="block text-lg mb-2 text-gray-300">Lien du CV (Chemin ou URL)</label>
        <input
          value={heroData.cvLink}
          onChange={(e) => updateSection('hero', { ...heroData, cvLink: e.target.value })}
          placeholder="Ex: /assets/mon-cv.pdf"
          className={inputStyle}
        />
      </div>
    </motion.div>
  );
}