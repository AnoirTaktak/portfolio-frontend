// src/components/Admin/AdminFormations.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from '../ThemeContext';
import { useAdminData } from "../../hooks/useAdminData";
import { FormationData } from "../../types/adminData";
import { LocalizedInput } from "../../context/LocalizedInput";

// Explication : Gère la section Formations (titre et lieu multilingues).
export default function AdminFormations() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { data, updateSection, generateId } = useAdminData();
    const formations = data.formations as FormationData[];

    const initialLocalizedText = { fr: "", en: "", de: "", tr: "" };
    const initialNewFormation: Omit<FormationData, '_id'> = { titre: initialLocalizedText, lieu: initialLocalizedText, annee: '', lienDiplome: '', lienReleve: '' };
    
    const [newFormation, setNewFormation] = useState(initialNewFormation);

    const handleLocalizedUpdate = (field: 'titre' | 'lieu', lang: string, value: string) => {
        setNewFormation(prev => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
    };

    // --- CRUD Logic ---
    const handleAdd = () => {
        if (!newFormation.titre.fr || !newFormation.annee) return alert("⚠️ Titre et Année requis !");
        
        const newF: FormationData = { _id: generateId(), ...newFormation };
        updateSection('formations', [...formations, newF]);
        setNewFormation(initialNewFormation);
    };

    const handleDelete = (id: string) => updateSection('formations', formations.filter((f) => f._id !== id));
    // --- Fin CRUD Logic ---

    const inputStyle = `w-full p-2 rounded outline-none border border-gray-500/30 ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800'}`;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Gestion des Formations</h2>

            {/* Formulaire d'ajout */}
            <div className={`p-6 rounded-lg shadow-md mb-8 ${isDark ? 'bg-slate-800/60' : 'bg-white/60'} backdrop-blur-lg`}>
                <h3 className="font-semibold mb-3 text-lg text-blue-300">Ajouter une nouvelle formation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <LocalizedInput label="Titre de la Formation" localizedText={newFormation.titre} onUpdate={(lang, value) => handleLocalizedUpdate('titre', lang, value)} />
                    </div>
                    <div className="md:col-span-2">
                        <LocalizedInput label="Lieu / Institution" localizedText={newFormation.lieu} onUpdate={(lang, value) => handleLocalizedUpdate('lieu', lang, value)} />
                    </div>
                    
                    <input placeholder="Année (Ex: 2024)" value={newFormation.annee} onChange={(e) => setNewFormation({ ...newFormation, annee: e.target.value })} className={inputStyle} />
                    <input placeholder="Lien Diplôme (URL)" value={newFormation.lienDiplome} onChange={(e) => setNewFormation({ ...newFormation, lienDiplome: e.target.value })} className={inputStyle} />
                    <input placeholder="Lien Relevé de Notes (URL)" value={newFormation.lienReleve} onChange={(e) => setNewFormation({ ...newFormation, lienReleve: e.target.value })} className={inputStyle} />

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAdd} className="text-white px-4 py-2 rounded-md shadow-md transition bg-blue-600 hover:bg-blue-700 md:col-span-2">
                        ➕ Ajouter la Formation
                    </motion.button>
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-blue-300 mb-4">Liste des Formations ({formations.length})</h3>
            <div className="space-y-4">
                {formations.map((f) => (
                    <div key={f._id} className="p-4 rounded-lg bg-slate-800/60 shadow-md">
                        <h4 className="font-bold text-lg text-blue-300">{f.titre.fr || f.titre.en}</h4>
                        <p className="text-sm text-gray-400">{f.lieu.fr || f.lieu.en} - {f.annee}</p>
                        <button onClick={() => handleDelete(f._id!)} className="text-red-500 hover:text-red-400 text-sm mt-2">Supprimer</button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}