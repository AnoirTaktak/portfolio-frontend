// src/data/projects.ts
export type Project = {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    github?: string;
    demo?: string;
    image?: string;
    type?: string; // stage, perso, académique
  };
  
  export const projects: Project[] = [
    {
      id: "p-mern",
      title: "Application de gestion de stock et de facturation",
      description:
        "Application Full Stack MERN permettant de gérer le stock, les clients et les factures avec authentification et interface moderne.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
      github: "https://github.com/AnoirTaktak/stock-mern",
      type: "Académique",
    },
    {
      id: "p-laravel",
      title: "Système e-commerce (Laravel + Vue)",
      description:
        "Projet académique complet de vente en ligne avec gestion des produits, panier et paiement simulé.",
      technologies: ["Laravel", "Vue.js", "MySQL"],
      type: "Académique",
    },
    {
      id: "p-perfaxis",
      title: "Application de gestion d’utilisateurs et permissions",
      description:
        "Projet de stage (PERFAXIS) : développement d’un système CRUD avec ASP.NET + Angular, intégration Swagger et SQL Server.",
      technologies: ["ASP.NET", "Angular", "SQL Server", "Swagger"],
      type: "Stage",
    },
  ];
  