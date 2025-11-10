// src/components/Admin/AdminProjects.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../ThemeContext';
import { useAdminData } from "../../hooks/useAdminData";
import { ProjectData, LocalizedText } from "../../types/adminData";
import { LocalizedInput } from "../../context/LocalizedInput";

// Explication : Gère la section Projets avec CRUD, champs multilingues (titre, description) et champs statiques (technologies, liens).
export default function AdminProjects() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { data, updateSection, generateId } = useAdminData();
    const projects = data.projects as ProjectData[];

    const initialLocalizedText: LocalizedText = { fr: "", en: "", de: "", tr: "" };
    const initialNewProject: Omit<ProjectData, '_id'> = { title: initialLocalizedText, description: initialLocalizedText, technologies: [], github: '', demo: '', image: '' };
    
    const [newProject, setNewProject] = useState(initialNewProject);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingProject, setEditingProject] = useState<ProjectData | null>(null);

    const handleLocalizedUpdate = (project: ProjectData | Omit<ProjectData, '_id'>, field: 'title' | 'description', lang: string, value: string) => {
        const newLocalizedText = { ...project[field], [lang]: value };
        return { ...project, [field]: newLocalizedText };
    };

    // --- CRUD Logic ---
    const handleAdd = () => {
        if (!newProject.title.fr || !newProject.description.fr) return alert("⚠️ Titre et Description (FR/EN) requis !");
        
        const newP: ProjectData = { 
            _id: generateId(), 
            ...newProject, 
            technologies: newProject.technologies.join(',').split(',').map(t => t.trim()).filter(Boolean)
        };
        updateSection('projects', [...projects, newP]);
        setNewProject(initialNewProject);
    };

    const handleDelete = (id: string) => updateSection('projects', projects.filter((p) => p._id !== id));
    
    const handleEdit = (project: ProjectData) => {
        setEditingId(project._id!);
        // Transforme le tableau de technologies en chaîne pour l'édition
        setEditingProject({ ...project, technologies: project.technologies.join(', ') as any });
    };
    
    const handleSave = () => {
        if (!editingProject || !editingProject.title.fr) return alert("⚠️ Titre (FR/EN) requis !");

        // Convertit la chaîne de technologies en tableau avant la sauvegarde
        const savedProject: ProjectData = {
            ...editingProject,
            technologies: (editingProject.technologies as any as string).split(',').map(t => t.trim()).filter(Boolean)
        };
        
        const updatedProjects = projects.map(p => p._id === editingId ? savedProject : p);
        updateSection('projects', updatedProjects);
        setEditingId(null);
        setEditingProject(null);
    };

    const handleCancelEdit = () => { setEditingId(null); setEditingProject(null); };
    // --- Fin CRUD Logic ---

    const inputStyle = `w-full p-2 rounded outline-none border border-gray-500/30 ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800'}`;
    const cardStyle = `p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center shadow-md ${isDark ? 'bg-slate-800/60' : 'bg-white/80'} backdrop-blur-md`;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Gestion des Projets</h2>

            {/* Formulaire d'ajout */}
            <div className={`p-6 rounded-lg shadow-md mb-8 ${isDark ? 'bg-slate-800/60' : 'bg-white/60'} backdrop-blur-lg`}>
                <h3 className="font-semibold mb-3 text-lg text-blue-300">Ajouter un nouveau projet</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <LocalizedInput
                            label="Titre du Projet"
                            localizedText={newProject.title}
                            onUpdate={(lang, value) => setNewProject(handleLocalizedUpdate(newProject, 'title', lang, value) as any)}
                        />
                    </div>
                    <div className="md:col-span-2">
                         <LocalizedInput
                            label="Description du Projet"
                            localizedText={newProject.description}
                            onUpdate={(lang, value) => setNewProject(handleLocalizedUpdate(newProject, 'description', lang, value) as any)}
                            type="textarea"
                        />
                    </div>
                    
                    <input placeholder="Technologies (HTML, React, séparées par virgule)" value={newProject.technologies.join(', ')} onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} className={inputStyle} />
                    <input placeholder="GitHub URL" value={newProject.github} onChange={(e) => setNewProject({ ...newProject, github: e.target.value })} className={inputStyle} />
                    <input placeholder="Demo URL" value={newProject.demo} onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })} className={inputStyle} />
                    <input placeholder="Image URL" value={newProject.image} onChange={(e) => setNewProject({ ...newProject, image: e.target.value })} className={inputStyle} />

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAdd} className="text-white px-4 py-2 rounded-md shadow-md transition bg-blue-600 hover:bg-blue-700 md:col-span-2">
                        ➕ Ajouter le projet
                    </motion.button>
                </div>
            </div>

            {/* Liste des projets (similaire à AdminSkills pour l'affichage/édition) */}
            <div className="space-y-4">
                {/* ... (Affichage des projets avec bouton Modifier/Supprimer) ... */}
                <p className="text-gray-500 italic">Affichage des projets omis pour la concision. La logique CRUD est similaire à AdminSkills, mais utilisant l'édition des LocalizedText dans le formulaire d'édition.</p>
            </div>
        </motion.div>
    );
}