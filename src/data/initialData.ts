// src/data/initialData.ts
import { PortfolioData, LocalizedText } from '../types/adminData';

// Données initiales pour chaque section
export const initialData: PortfolioData = {
    hero: {
        _id: "hero1",
        title: { fr: "Développeur Full Stack", en: "Full Stack Developer", de: "Vollständiger Stack-Entwickler" },
        subtitle: { fr: "MERN Stack | .Net | Symfony", en: "MERN Stack | .Net | Symfony", de: "MERN-Stack | .Net | Symfony" },
        description: { 
            fr: "Je conçois des solutions modernes et performantes.", 
            en: "I design modern and performant solutions.",
            de: "Ich entwickle moderne und leistungsstarke Lösungen."
        },
        cvLink: "/CV_Anoir_Taktak_2025.pdf",
    },
    about: {
        _id: "about1",
        description: {
            fr: "Mon expérience couvre l'ensemble du cycle de vie des applications.",
            en: "My experience covers the entire application lifecycle.",
            de: "Meine Erfahrung umfasst den gesamten Anwendungslebenszyklus."
        },
        imageUrl: "/path/to/profile.jpg",
    },
    links: [
        { _id: "link1", name: "GitHub", url: "https://github.com/AnoirTaktak", icon: "github" },
        { _id: "link2", name: "LinkedIn", url: "https://linkedin.com/in/anoirtaktak", icon: "linkedin" },
    ],
    skills: [
        { _id: "s1", name: { fr: "React.js", en: "React.js" }, type: "FRONTEND", icon: "react" },
        { _id: "s2", name: { fr: "Node.js", en: "Node.js" }, type: "BACKEND", icon: "node" },
        { _id: "s3", name: { fr: "MongoDB", en: "MongoDB" }, type: "DATABASE", icon: "mongodb" },
    ],
    projects: [
        { 
            _id: "p1", 
            title: { fr: "Plateforme E-commerce", en: "E-commerce Platform" }, 
            description: { fr: "Solution de vente en ligne complète.", en: "Complete online sales solution." }, 
            technologies: ["React", "Stripe", "Express"], 
            github: "#", demo: "#", image: "#" 
        },
    ],
    experiences: [
        { 
            _id: "e1", 
            role: { fr: "Développeur Full Stack", en: "Full Stack Developer" }, 
            company: "Tech Solutions", 
            location: "Sfax, Tunisie", 
            start: "2024-01", 
            end: "Présent", 
            bullets: [
                { fr: "Développement d'APIs RESTful performantes.", en: "Developing high-performance RESTful APIs." },
                { fr: "Intégration d'interfaces utilisateur React.", en: "Integration of React user interfaces." }
            ] as LocalizedText[],
            tech: ["Node.js", "Express", "React"],
            proofLink: "#"
        },
    ],
    formations: [
        { 
            _id: "f1", 
            titre: { fr: "Master Génie Logiciel", en: "Master Software Engineering" }, 
            lieu: { fr: "ISET Sfax", en: "ISET Sfax" }, 
            annee: "2024", 
            lienDiplome: "#", 
            lienReleve: "#"
        },
    ],
    contact: { phone: "+216 29 036 555", email: "Anoirtaktak@hotmail.fr", adress: "Sfax, Tunisie" }
};

// Fonction pour charger ou initialiser les données depuis le localStorage
export const loadInitialData = (): PortfolioData => {
    const storedData = localStorage.getItem('portfolioAdminData');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return initialData;
}