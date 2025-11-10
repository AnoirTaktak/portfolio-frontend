// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserCheck, Save, Loader2, Home, User, Lightbulb, Briefcase, GraduationCap, Code } from "lucide-react"; 
import { useAdminData } from "../hooks/useAdminData"; 

// --- IMPORTS DES COMPOSANTS ADMIN ---
import AdminHero from "../components/admin/AdminHero"; 
import AdminAbout from "../components/admin/AdminAbout"; 
import AdminSkills from "../components/admin/AdminSkills"; 
import AdminExperiences from "../components/admin/AdminExperiences"; 
import AdminFormations from "../components/admin/AdminFormations"; 
import AdminProjects from "../components/admin/AdminProjects"; 
import AdminContact from "../components/admin/AdminContact"; 

// Définition des sections de navigation
const adminSections = [
    { id: 'hero', name: 'Héros', icon: Home, component: AdminHero },
    { id: 'about', name: 'À Propos', icon: User, component: AdminAbout },
    { id: 'skills', name: 'Compétences', icon: Lightbulb, component: AdminSkills },
    { id: 'experiences', name: 'Expériences', icon: Briefcase, component: AdminExperiences },
    { id: 'formations', name: 'Formations', icon: GraduationCap, component: AdminFormations },
    { id: 'projects', name: 'Projets', icon: Code, component: AdminProjects },
    { id: 'contact', name: 'Contact & Liens', icon: UserCheck, component: AdminContact },
];

export default function AdminDashboard() {
    const { 
        data, 
        saveAllChanges, 
        isLoading, 
        isSaving, 
        error 
    } = useAdminData(); 

    const nav = useNavigate();
    const [activeSection, setActiveSection] = useState(adminSections[0].id);

    // Simulation de l'authentification
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) nav("/admin"); 
    }, [nav]);
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        nav("/admin");
    };

    const ActiveComponent = adminSections.find(s => s.id === activeSection)?.component;

    return (
        // Le padding du bas doit être ajusté pour éviter que le contenu ne soit masqué par le footer fixe (ex: p-6 + pb-20)
        <div className="min-h-screen p-6 pb-20 bg-slate-900 text-white font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* L'ancien bloc du titre et des boutons est réduit à juste le titre */}
                <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                    <h1 className="text-3xl font-bold text-blue-400 flex items-center">
                        <UserCheck className="mr-3" size={30} /> 
                        Tableau de Bord
                    </h1>
                </div>

                {/* Affichage du statut / Erreur */}
                {isLoading && (
                    <div className="p-4 bg-blue-900/50 text-blue-300 rounded mb-4 flex items-center">
                        <Loader2 className="animate-spin mr-3" size={18} /> Chargement des données du backend...
                    </div>
                )}
                {error && (
                    <div className="p-4 bg-red-900/50 text-red-300 rounded mb-4 font-semibold">
                        Erreur de connexion : {error}
                    </div>
                )}
                
                {/* Navigation par Onglets */}
                <nav className="flex space-x-1 mb-6 overflow-x-auto pb-2">
                    {adminSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200 ${
                                activeSection === section.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                        >
                            <section.icon size={18} className="mr-2"/>
                            {section.name}
                        </button>
                    ))}
                </nav>

                {/* Contenu de la section active */}
                <div className="bg-slate-800/80 p-6 rounded-lg shadow-xl min-h-[60vh]">
                    {data && ActiveComponent ? <ActiveComponent /> : <p className="text-center py-10 text-slate-400">En attente de chargement des données...</p>}
                </div>
            </div>

            {/* NOUVEAU PIED DE PAGE FIXE AVEC LES BOUTONS */}
            <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 border-t border-slate-700 shadow-2xl z-50 p-3">
                <div className="max-w-7xl mx-auto flex justify-end gap-4 items-center">
                    
                    {/* 1. Bouton d'Enregistrement Global */}
                    <button 
                        onClick={saveAllChanges}
                        disabled={isLoading || isSaving || !data} 
                        className={`px-6 py-3 rounded-lg font-bold flex items-center transition ${
                            isSaving 
                                ? 'bg-orange-500 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 disabled:opacity-50'
                        }`}
                    >
                        {isSaving ? (
                            <Loader2 size={20} className="mr-2 animate-spin"/>
                        ) : (
                            <Save size={20} className="mr-2"/>
                        )}
                        {isSaving ? "Sauvegarde..." : "Enregistrer les Changements"}
                    </button>

                    {/* 2. Bouton Déconnexion */}
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-bold flex items-center"
                    >
                         <LogOut size={20} className="mr-2"/> Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
}