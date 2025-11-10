// src/components/Admin/AdminSkills.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../ThemeContext';
import { useAdminData } from "../../hooks/useAdminData";
import { CompData, CompType, LocalizedText } from "../../types/adminData";
import { LocalizedInput } from "../../context/LocalizedInput";
// Explication : Gère la section Compétences avec CRUD et champs multilingues.
export default function AdminSkills() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { data, updateSection, generateId } = useAdminData();
    const skills = data.skills as CompData[];

    const initialLocalizedText: LocalizedText = { fr: "", en: "", de: "", tr: "" };
    const initialNewSkill: Omit<CompData, '_id'> = { name: initialLocalizedText, type: 'FRONTEND', icon: '' };
    
    const [newSkill, setNewSkill] = useState(initialNewSkill);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingSkill, setEditingSkill] = useState<CompData | null>(null);
    const skillTypes: CompType[] = ['FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS', 'OTHER'];

    const handleLocalizedUpdate = (skill: CompData | Omit<CompData, '_id'>, lang: string, value: string) => {
        const newName = { ...skill.name, [lang]: value };
        return { ...skill, name: newName };
    };
    
    // --- CRUD Logic ---
    const handleAdd = () => {
        if (!newSkill.name.fr || !newSkill.type) return alert("⚠️ Nom et Type (FR/EN) requis !");
        
        const newP: CompData = { _id: generateId(), ...newSkill };
        updateSection('skills', [...skills, newP]);
        setNewSkill(initialNewSkill);
    };

    const handleDelete = (id: string) => updateSection('skills', skills.filter((s) => s._id !== id));
    
    const handleEdit = (skill: CompData) => {
        setEditingId(skill._id!);
        setEditingSkill(skill);
    };
    
    const handleSave = () => {
        if (!editingSkill || !editingSkill.name.fr) return alert("⚠️ Nom (FR/EN) requis !");
        
        const updatedSkills = skills.map(s => s._id === editingId ? editingSkill : s);
        updateSection('skills', updatedSkills);
        setEditingId(null);
        setEditingSkill(null);
    };

    const handleCancelEdit = () => { setEditingId(null); setEditingSkill(null); };
    // --- Fin CRUD Logic ---

    const inputStyle = `w-full p-2 rounded outline-none border border-gray-500/30 ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800'}`;
    const cardStyle = `p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center shadow-md ${isDark ? 'bg-slate-800/60' : 'bg-white/80'} backdrop-blur-md`;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Gestion des Compétences</h2>

            {/* Formulaire d'ajout */}
            <div className={`p-6 rounded-lg shadow-md mb-8 ${isDark ? 'bg-slate-800/60' : 'bg-white/60'} backdrop-blur-lg`}>
                <h3 className="font-semibold mb-3 text-lg text-blue-300">Ajouter une nouvelle compétence</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-3">
                        <LocalizedInput
                            label="Nom de la Compétence"
                            localizedText={newSkill.name}
                            onUpdate={(lang, value) => setNewSkill(handleLocalizedUpdate(newSkill, lang, value))}
                            placeholderPrefix="React.js"
                        />
                    </div>
                    
                    {/* Type de Compétence */}
                    <select value={newSkill.type} onChange={(e) => setNewSkill({ ...newSkill, type: e.target.value as CompType })} className={inputStyle}>
                        {skillTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    {/* Icône */}
                    <input placeholder="Nom de l'icône (Ex: react, node)" value={newSkill.icon} onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })} className={inputStyle} />
                    
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAdd} className="text-white px-4 py-2 rounded-md shadow-md transition bg-blue-600 hover:bg-blue-700 md:col-span-1">
                        ➕ Ajouter la Compétence
                    </motion.button>
                </div>
            </div>

            {/* Liste des Compétences */}
            <div className="space-y-4">
                <AnimatePresence>
                    {skills.map((s) => (
                        <motion.div key={s._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className={cardStyle}>
                            {editingId === s._id && editingSkill ? (
                                // Mode Édition
                                <div className="w-full space-y-2">
                                    <LocalizedInput
                                        label="Nom de la Compétence"
                                        localizedText={editingSkill.name}
                                        onUpdate={(lang, value) => setEditingSkill(handleLocalizedUpdate(editingSkill, lang, value) as CompData)}
                                        className="p-0 border-none bg-transparent"
                                    />
                                    <div className="flex gap-2">
                                        <select value={editingSkill.type} onChange={(e) => setEditingSkill({ ...editingSkill, type: e.target.value as CompType })} className={inputStyle}>
                                            {skillTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <input placeholder="Nom de l'icône" value={editingSkill.icon} onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })} className={inputStyle} />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <motion.button whileHover={{ scale: 1.05 }} onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded text-sm shadow-md">Enregistrer</motion.button>
                                        <motion.button whileHover={{ scale: 1.05 }} onClick={handleCancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded text-sm shadow-md">Annuler</motion.button>
                                    </div>
                                </div>
                            ) : (
                                // Mode Affichage
                                <>
                                    <div className="w-full md:w-3/4">
                                        <h4 className="font-bold text-lg text-blue-300">{s.name.fr || s.name.en}</h4>
                                        <p className="text-sm mt-1 text-gray-300">Type: <span className="font-semibold text-yellow-300">{s.type}</span> | Icône: {s.icon}</p>
                                    </div>
                                    <div className="flex gap-4 mt-3 md:mt-0 items-center text-sm">
                                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleEdit(s)} className="font-medium text-yellow-400">✏️ Modifier</motion.button>
                                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(s._id!)} className="font-medium text-red-500">❌ Supprimer</motion.button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}