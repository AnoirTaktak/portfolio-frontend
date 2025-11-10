import React, { useEffect, useState, useMemo } from "react"; 
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Wrench,
  HelpCircle,
} from "lucide-react";

// Importation des modules complets pour les icônes dynamiques
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

import { useTheme } from "./ThemeContext";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../context/LanguageContext";
import { getCompetences } from "../api/api";
import { CompData, CompType, LocalizedText } from "../types"; 

// Interface pour typer les props de l'icône, incluant 'className'
interface IconProps {
  className?: string;
}

// 🧩 Mappage et injection dynamique des icônes
const getIconComponent = (iconName: string, className: string = "w-5 h-5"): React.ReactElement => {
  // Définir un type strict pour les éléments qui seront clonés
  type ClonableElement = React.ReactElement<IconProps>;

  // L'icône de secours doit être définie en premier avec son type garanti
  const FallbackIcon: ClonableElement = <HelpCircle className="text-gray-400" />;

  // 1. Définition des icônes Lucide (elles seront typées ClonableElement)
  const lucideIconMap: { [key: string]: ClonableElement } = {
    "Server": <Server className="text-purple-400" />,
    "Database": <Database className="text-blue-400" />,
    "Wrench": <Wrench className="text-yellow-400" />,
    "Code2": <Code2 className="text-blue-400" />,
  };

  let IconComponent: React.ReactElement<any> | null = null;
  
  if (lucideIconMap[iconName]) {
      // Cas des icônes Lucide pré-définies
      IconComponent = lucideIconMap[iconName];
  } else if ((FaIcons as any)[iconName]) {
      // Cas des icônes react-icons/fa (ex: "FaReact")
      const FaIcon = (FaIcons as any)[iconName];
      // On ajoute une className vide pour garantir que la prop existe pour cloneElement
      IconComponent = <FaIcon className="" />;
  } else if ((SiIcons as any)[iconName]) {
      // Cas des icônes react-icons/si (ex: "SiMongodb")
      const SiIcon = (SiIcons as any)[iconName];
      // On ajoute une className vide pour garantir que la prop existe pour cloneElement
      IconComponent = <SiIcon className="" />;
  }

  // 3. Fallback si l'icône est introuvable
  if (!IconComponent) {
      IconComponent = FallbackIcon;
  }

  // 4. Appliquer les classes et retourner l'élément
  // On cast les props pour informer TypeScript que 'className' est disponible
  const iconProps = IconComponent.props as IconProps; 
  
  // Utiliser React.cloneElement pour ajouter la classe 'className' dynamique
  return React.cloneElement(IconComponent, { className: `${className} ${iconProps.className || ''}` });
};

export default function Skills() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t, language } = useLanguage();

  const [skills, setSkills] = useState<CompData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fonction pour extraire le nom traduit de la compétence
  const getSkillName = (localizedText: LocalizedText): string => {
    return localizedText[language as keyof LocalizedText] || localizedText.fr || "N/A";
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getCompetences();
        setSkills(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(t("error_loading_skills"));
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [t]);

  // Définition des 4 catégories principales
  const categoryDefinitions: { [key in CompType]: { titleKey: string; icon: React.ReactElement; order: number } } = {
    FRONTEND: { titleKey: "category_frontend", icon: <Code2 className="w-6 h-6 text-blue-400" />, order: 1 },
    BACKEND: { titleKey: "category_backend", icon: <Server className="w-6 h-6 text-purple-400" />, order: 2 },
    DATABASE: { titleKey: "category_database", icon: <Database className="w-6 h-6 text-green-400" />, order: 3 },
    // TOOLS inclura TOOLS et OTHER pour l'affichage
    TOOLS: { titleKey: "category_tools", icon: <Wrench className="w-6 h-6 text-yellow-400" />, order: 4 },
    // OTHER est conservé ici uniquement pour ne pas avoir d'erreur TypeScript sur l'enum CompType, mais il est ignoré
    OTHER: { titleKey: "category_other", icon: <HelpCircle className="w-6 h-6 text-slate-400" />, order: 5 }, 
  };

  // Regroupe les compétences par type (avec fusion TOOLS + OTHER)
  const groupedSkills = useMemo(() => {
    return skills.reduce((acc, skill) => {
      let type = skill.type as CompType;
      
      // 💡 LOGIQUE DE FUSION : Si le type est OTHER, on le force à devenir TOOLS.
      if (type === 'OTHER') {
          type = 'TOOLS';
      }

      // ✅ CORRIGÉ : Seul le contrôle categoryDefinitions[type] est nécessaire
      if (categoryDefinitions[type]) { 
          if (!acc[type]) {
              acc[type] = [];
          }
          acc[type].push(skill);
      }
      return acc;
    }, {} as Record<CompType, CompData[]>);
  }, [skills]);

  // Construit et trie les 4 catégories finales pour l'affichage
  const sortedCategories = useMemo(() => {
    return (Object.keys(groupedSkills) as CompType[])
      .map(key => ({
        title: t(categoryDefinitions[key].titleKey), 
        icon: categoryDefinitions[key].icon,
        order: categoryDefinitions[key].order,
        skills: groupedSkills[key],
        key: key
      }))
      .sort((a, b) => a.order - b.order); 
  }, [groupedSkills, t]);


  if (loading)
    return (
      <section className="flex justify-center items-center min-h-[50vh] text-lg">
        {t("loading_skills")}
      </section>
    );

  if (error)
    return (
      <section className="flex justify-center items-center min-h-[50vh] text-red-700 text-lg">
        {error}
      </section>
    );

  if (skills.length === 0)
    return (
      <section className="flex justify-center items-center min-h-[50vh] text-gray-500 text-lg">
        {t("no_skills")}
      </section>
    );

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
            {t("skills_title")}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedCategories.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
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
                        {/* Affichage dynamique de l'icône */}
                        {skill.icon ? getIconComponent(skill.icon) : <HelpCircle className="w-5 h-5 text-gray-400" />}
                      </span>
                      <span
                        className={`group-hover:text-blue-400 ${
                          isDark ? "text-slate-300" : "text-gray-700"
                        }`}
                      >
                        {/* Affichage du nom traduit */}
                        {getSkillName(skill.name as LocalizedText)}
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