import { useState, useEffect, useCallback, useRef } from 'react'; // Ajout de useRef
import { PortfolioData } from '../types/adminData';
import { initialData } from '../data/initialData';
import { 
    updateHero, updateAbout, updateLinks, updateExperiences, updateFormations, updateProjects, updateCompetences, updateContact,
    getHero, getAbout, getLinks, getExperiences, getFormations, getProjects, getCompetences, getContact,
} from '../api/api'; 

// Définition du type pour le mappage des fonctions d'API
type ApiUpdateFunction = (data: any) => Promise<any>;

export const useAdminData = () => {
    const [data, setData] = useState<PortfolioData>(initialData); 
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🔑 SOLUTION AU PROBLÈME D'ÉTAT OBSOLÈTE : Utilisation de useRef
    const dataRef = useRef(data);
    
    // Ce useEffect met à jour le ref à chaque changement de l'état 'data'
    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    // --- Fonction utilitaire de journalisation et d'appel API ---
    const logAndCall = async (endpoint: string, dataToSend: any, apiCall: ApiUpdateFunction) => {
        console.log(`================================================================`);
        console.log(`useAdminData.ts:25 [PUT] ➡️ Tentative d'envoi à l'API: /api${endpoint}`);
        
        // Journalisation du BODY envoyé, formaté pour la lisibilité
        console.log(`useAdminData.ts:28 BODY JSON envoyé:`, JSON.stringify(dataToSend, null, 2)); 
        console.log(`useAdminData.ts:29 ================================================================`);

        // Effectue l'appel API réel
        return apiCall(dataToSend);
    };
    // -----------------------------------------------------------

    // --- CHARGEMENT DES DONNÉES (FETCH) ---
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [
                hero, about, links, experiences, formations, projects, skills, contact
            ] = await Promise.all([
                getHero(), getAbout(), getLinks(), getExperiences(), getFormations(), 
                getProjects(), getCompetences(), getContact(),
            ]);

            const loadedData: PortfolioData = {
                hero: hero || initialData.hero, 
                about: about || initialData.about,
                links: links || initialData.links,
                experiences: experiences || initialData.experiences,
                formations: formations || initialData.formations,
                projects: projects || initialData.projects,
                skills: skills || initialData.skills,
                contact: contact || initialData.contact,
            };

            setData(loadedData);
        } catch (e) {
            console.error("Erreur lors du chargement des données:", e);
            setError("Impossible de charger les données du serveur. Vérifiez la console et l'état de votre API.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- MISE À JOUR LOCALE ---
    const updateSection = (sectionName: keyof PortfolioData, newData: any) => {
        setData(prevData => ({
            ...prevData,
            [sectionName]: newData
        }));
    };
    
    // --- SAUVEGARDE GLOBALE (SAVE) ---
    // Enveloppé dans useCallback sans dépendances pour éviter la recréation inutile.
    // Il utilise dataRef.current pour obtenir la dernière valeur de l'état.
    const saveAllChanges = useCallback(async () => {
        setIsSaving(true);
        setError(null);
        
        // 🚨 Accès aux données les plus récentes via le Ref
        const latestData = dataRef.current;

        try {
            await Promise.all([
                logAndCall('/hero', latestData.hero, updateHero), // Utilise latestData
                logAndCall('/about', latestData.about, updateAbout), // Utilise latestData
                logAndCall('/contact', latestData.contact, updateContact), // Utilise latestData
                logAndCall('/links', latestData.links, updateLinks), // Utilise latestData
                logAndCall('/experiences', latestData.experiences, updateExperiences), // Utilise latestData
                logAndCall('/formations', latestData.formations, updateFormations), // Utilise latestData
                logAndCall('/projects', latestData.projects, updateProjects), // Utilise latestData
                logAndCall('/skills', latestData.skills, updateCompetences), // Utilise latestData
            ]);
            
            alert("✅ Données enregistrées avec succès sur le serveur !");
        } catch (e) {
            console.error("Erreur lors de la sauvegarde:", e);
            setError("❌ Échec de l'enregistrement ! Vérifiez la configuration de votre API backend (endpoints PUT).");
        } finally {
            setIsSaving(false);
        }
    }, []); // Dépendances vides: fonctionne grâce au dataRef

    const generateId = () => Date.now().toString();

    return { 
        data, 
        updateSection, 
        generateId,
        saveAllChanges,
        isLoading,
        isSaving,
        error,
        fetchData
    };
};