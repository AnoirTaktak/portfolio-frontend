// src/data/skills.ts
export type Skill = { name: string; level: number; category?: string };

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "Frontend" },
  { name: "Angular", level: 80, category: "Frontend" },
  { name: "Vue.js", level: 75, category: "Frontend" },
  { name: "TypeScript", level: 75, category: "Frontend" },
  { name: "TailwindCSS", level: 85, category: "Frontend" },
  { name: "Bootstrap", level: 90, category: "Frontend" },

  // Backend
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Express", level: 80, category: "Backend" },
  { name: "C# / ASP.NET", level: 80, category: "Backend" },
  { name: "Symfony", level: 70, category: "Backend" },
  { name: "Laravel", level: 70, category: "Backend" },

  // Bases de données
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "SQL Server", level: 80, category: "Database" },
  { name: "MySQL", level: 75, category: "Database" },

  // Outils & Autres
  { name: "Git / GitHub", level: 85, category: "Tools" },
  { name: "Swagger", level: 70, category: "Tools" },
  { name: "Docker", level: 60, category: "Tools" },
];
