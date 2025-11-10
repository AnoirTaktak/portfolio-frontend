// src/components/Admin/AdminContact.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from '../ThemeContext';
import { useAdminData } from "../../hooks/useAdminData";
import { ContactData, LinkData } from "../../types/adminData";

// Explication : Gère les informations de contact statiques et les liens sociaux (CRUD).
export default function AdminContact() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { data, updateSection, generateId } = useAdminData();
    const contactData = data.contact as ContactData;
    const links = data.links as LinkData[];

    const initialNewLink: Omit<LinkData, '_id'> = { name: '', url: '', icon: '' };
    const [newLink, setNewLink] = useState(initialNewLink);

    // --- Logique Contact (Statique) ---
    const updateContact = (field: keyof ContactData, value: string) => {
        updateSection('contact', { ...contactData, [field]: value });
    };

    // --- Logique Liens Sociaux (CRUD) ---
    const handleAddLink = () => {
        if (!newLink.name || !newLink.url) return alert("⚠️ Nom et URL requis !");
        
        const newL: LinkData = { _id: generateId(), ...newLink };
        updateSection('links', [...links, newL]);
        setNewLink(initialNewLink);
    };

    const handleDeleteLink = (id: string) => updateSection('links', links.filter((l) => l._id !== id));
    // --- Fin CRUD Logic ---

    const inputStyle = `w-full p-3 rounded border focus:ring-2 transition outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-600'}`;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Gestion Contact & Liens Sociaux</h2>

            {/* 1. Informations de Contact (Statiques) */}
            <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-slate-800/60' : 'bg-white/60'} backdrop-blur-lg`}>
                <h3 className="font-semibold mb-4 text-lg text-blue-300 border-b border-slate-700 pb-2">Informations de Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input placeholder="Téléphone" value={contactData.phone} onChange={(e) => updateContact('phone', e.target.value)} className={inputStyle} />
                    <input placeholder="Email" value={contactData.email} onChange={(e) => updateContact('email', e.target.value)} className={inputStyle} />
                    <input placeholder="Adresse (Ville, Pays)" value={contactData.adress} onChange={(e) => updateContact('adress', e.target.value)} className={inputStyle} />
                </div>
            </div>

            {/* 2. Liens Sociaux (CRUD) */}
            <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-slate-800/60' : 'bg-white/60'} backdrop-blur-lg`}>
                <h3 className="font-semibold mb-4 text-lg text-blue-300 border-b border-slate-700 pb-2">Liens Sociaux / Externes</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <input placeholder="Nom (Ex: GitHub)" value={newLink.name} onChange={(e) => setNewLink({ ...newLink, name: e.target.value })} className={inputStyle} />
                    <input placeholder="URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} className={inputStyle} />
                    <input placeholder="Icône (Ex: github, linkedin)" value={newLink.icon} onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })} className={inputStyle} />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddLink} className="text-white px-4 py-2 rounded-md shadow-md transition bg-green-600 hover:bg-green-700">
                        ➕ Ajouter le Lien
                    </motion.button>
                </div>

                <div className="space-y-3">
                    {links.map((l) => (
                        <div key={l._id} className={`p-3 rounded flex justify-between items-center ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                            <div className="flex-grow">
                                <span className="font-semibold text-blue-300">{l.name}</span>
                                <p className="text-xs text-gray-400 truncate">{l.url}</p>
                            </div>
                            <button onClick={() => handleDeleteLink(l._id!)} className="text-red-500 hover:text-red-400 text-sm ml-4">
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}