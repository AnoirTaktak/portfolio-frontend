// src/data/experience.ts
export type Experience = {
    id: string;
    role: string;
    company: string;
    start: string;
    end?: string;
    location?: string;
    bullets: string[];
    tech?: string[];
  };
  
  export const experiences: Experience[] = [
    {
      id: "exp-2025",
      role: "Stagiaire Développeur Full Stack",
      company: "PERFAXIS",
      start: "Jan 2025",
      end: "Juin 2025",
      location: "Sfax, Tunisie",
      bullets: [
        "Préparation et configuration de l’environnement de développement.",
        "Analyse des besoins et étude de l’existant.",
        "Développement backend (APIs REST, logique métier) et documentation Swagger.",
        "Développement frontend SPA avec Angular 17.",
      ],
      tech: ["ASP.NET", "Angular 17", "SQL Server", "Swagger"],
    },
    {
      id: "exp-2017",
      role: "Stagiaire Développeur Full Stack",
      company: "MINDUOS",
      start: "Déc 2016",
      end: "Juin 2017",
      location: "Sfax, Tunisie",
      bullets: [
        "Conception UML et architecture logicielle.",
        "Création d’un site web de réservation d’événements.",
        "Mise en place et gestion d’une base de données SQL Server.",
      ],
      tech: ["Symfony", "HTML/CSS/JS", "SQL Server"],
    },
  ];
  