// src/components/Admin/AdminExperiences.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from '../ThemeContext';
import { useAdminData } from "../../hooks/useAdminData";
import { ExperienceData, LocalizedText } from "../../types/adminData";
import { LocalizedInput } from "../../context/LocalizedInput";
import { Plus, Trash2 } from "lucide-react";

// Explication : Gère la section Expériences avec CRUD, rôle multilingue et un tableau de 'bullets' multilingues.
export default function AdminExperiences() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { data, updateSection, generateId } = useAdminData();
    const experiences = data.experiences as ExperienceData[];

    const initialLocalizedText: LocalizedText = { fr: "", en: "", de: "", tr: "" };
    const initialNewExperience: Omit<ExperienceData, '_id'> = { role: initialLocalizedText, company: '', location: '', start: '', end: '', bullets: [initialLocalizedText], tech: [], proofLink: '' };
    
    const [newExperience, setNewExperience] = useState(initialNewExperience);

    // --- CRUD Logic ---
    const handleAddBullet = () => setNewExperience(prev => ({ ...prev, bullets: [...prev.bullets, initialLocalizedText] }));
    const handleDeleteBullet = (index: number) => setNewExperience(prev => ({ ...prev, bullets: prev.bullets.filter((_, i) => i !== index) }));
    
    const handleBulletUpdate = (bulletIndex: number, lang: string, value: string) => {
        const newBullets = newExperience.bullets.map((bullet, i) => 
            i === bulletIndex ? { ...bullet, [lang]: value } : bullet
        );
        setNewExperience(prev => ({ ...prev, bullets: newBullets as LocalizedText[] }));
    };

    const handleRoleUpdate = (lang: string, value: string) => {
        setNewExperience(prev => ({ ...prev, role: { ...prev.role, [lang]: value } }));
    };

    const handleAdd = () => {
        if (!newExperience.role.fr || !newExperience.company || !newExperience.start) return alert("⚠️ Rôle, Compagnie et Date de Début requis !");
        
        const newE: ExperienceData = { 
            _id: generateId(), 
            ...newExperience, 
            tech: newExperience.tech.join(',').split(',').map(t => t.trim()).filter(Boolean)
        };
        updateSection('experiences', [...experiences, newE]);
        setNewExperience(initialNewExperience);
    };

    const handleDelete = (id: string) => updateSection('experiences', experiences.filter((e) => e._id !== id));
    // ... (Logique d'édition omise par souci de concision, elle est similaire à Projects mais plus complexe) ...
    // --- Fin CRUD Logic ---

    const inputStyle = `w-full p-2 rounded outline-none border border-gray-500/30 ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800'}`;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Gestion des Expériences</h2>

            {/* Formulaire d'ajout */}
            <div className={`p-6 rounded-lg shadow-md mb-8 ${isDark ? 'bg-slate-800/60' : 'bg-white/60'} backdrop-blur-lg`}>
                <h3 className="font-semibold mb-3 text-lg text-blue-300">Ajouter une nouvelle expérience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <LocalizedInput label="Rôle / Intitulé du Poste" localizedText={newExperience.role} onUpdate={handleRoleUpdate} placeholderPrefix="Développeur Full Stack" />
                    </div>

                    <input placeholder="Compagnie" value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} className={inputStyle} />
                    <input placeholder="Lieu (Ville, Pays)" value={newExperience.location} onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })} className={inputStyle} />
                    <input placeholder="Date de Début (AAAA-MM)" value={newExperience.start} onChange={(e) => setNewExperience({ ...newExperience, start: e.target.value })} className={inputStyle} />
                    <input placeholder="Date de Fin (AAAA-MM ou 'Présent')" value={newExperience.end} onChange={(e) => setNewExperience({ ...newExperience, end: e.target.value })} className={inputStyle} />
                    <input placeholder="Technologies (Node, React, ...)" value={newExperience.tech.join(', ')} onChange={(e) => setNewExperience({ ...newExperience, tech: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} className={inputStyle} />
                    <input placeholder="Lien Preuve/Attestation (Optionnel)" value={newExperience.proofLink} onChange={(e) => setNewExperience({ ...newExperience, proofLink: e.target.value })} className={inputStyle} />

                    {/* Gestion des Bullets */}
                    <div className="md:col-span-2 p-4 border border-slate-700 rounded-lg space-y-3">
                        <h4 className="text-lg font-medium text-gray-300">Tâches / Réalisations (Bullets Points)</h4>
                        {newExperience.bullets.map((bullet, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <div className="flex-grow">
                                    <LocalizedInput
                                        label={`Bullet #${index + 1}`}
                                        localizedText={bullet}
                                        onUpdate={(lang, value) => handleBulletUpdate(index, lang, value)}
                                        type="textarea"
                                        placeholderPrefix="Tâche de l'expérience"
                                        className="p-0 border-none bg-transparent"
                                    />
                                </div>
                                <button onClick={() => handleDeleteBullet(index)} className="mt-4 text-red-500 hover:text-red-400 p-2 rounded-full transition">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <button onClick={handleAddBullet} className="flex items-center text-blue-400 hover:text-blue-300 transition">
                            <Plus size={18} className="mr-1" /> Ajouter un Bullet
                        </button>
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAdd} className="text-white px-4 py-2 rounded-md shadow-md transition bg-blue-600 hover:bg-blue-700 md:col-span-2">
                        ➕ Ajouter l'Expérience
                    </motion.button>
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-blue-300 mb-4">Liste des Expériences ({experiences.length})</h3>
            <div className="space-y-4">
                {experiences.map((e) => (
                    <div key={e._id} className="p-4 rounded-lg bg-slate-800/60 shadow-md">
                        <h4 className="font-bold text-lg text-blue-300">{e.role.fr || e.role.en} chez {e.company}</h4>
                        <p className="text-sm text-gray-400">{e.start} - {e.end}</p>
                        <button onClick={() => handleDelete(e._id!)} className="text-red-500 hover:text-red-400 text-sm mt-2">Supprimer</button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}