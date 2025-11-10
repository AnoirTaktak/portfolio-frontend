import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'de' | 'tr';
type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    about: "À propos", 
    experience: "Expériences", 
    formations: "Formations", 
    projects: "Projets", 
    contact: "Contact", 
    admin: "Admin",
    
    // Hero
    fullstack_developer: "Développeur Full Stack MERN", 
    hero_description: "Je conçois des solutions modernes et performantes combinant React, Node, MongoDB et Tailwind. Passionné par l’innovation et le design soigné.",
    download_cv: "Télécharger CV", 
    loading: "Chargement...", 
    error_loading: "Erreur de chargement des données du Hero",
    
    // About
    error_loading_about: "Erreur de chargement de la section À propos",
    about_fallback_description: "Passionné par le développement web moderne, je conçois des solutions performantes et élégantes.",
    
    // Experience
    present: "Présent",
    view_certificate: "Voir l’attestation",
    proof_document: "Document de preuve",
    no_experience: "Aucune expérience pour le moment.",
    error_loading_experiences: "Erreur de chargement des expériences",
    
    // Formations
    view_diploma: "Voir Diplôme",
    view_transcript: "Voir Relevé",
    no_formations: "Aucune formation enregistrée.",
    error_loading_formations: "Erreur de chargement des formations",
    
    // Projets
    code: "Code",
    demo: "Démo",
    no_projects: "Aucun projet disponible pour le moment.",
    error_loading_projects: "Erreur lors du chargement des projets",

    // Compétences (Skills)
    skills_title: "Compétences Techniques",
    loading_skills: "Chargement des compétences...",
    error_loading_skills: "Erreur lors du chargement des compétences",
    no_skills: "Aucune compétence enregistrée.",
    category_frontend: "Frontend",
    category_backend: "Backend",
    category_database: "Base de données",
    category_tools: "Outils et Autres",
    category_other: "Autres",

    // ✅ NOUVEAU : Contact
    "contact_title": "Contactez-Moi",
    "copied_success": "Copié ✅"
  },
  en: {
    // Navigation
    about: "About", 
    experience: "Experience", 
    formations: "Education", 
    projects: "Projects", 
    contact: "Contact", 
    admin: "Admin",

    // Hero
    fullstack_developer: "MERN Full Stack Developer", 
    hero_description: "I design modern and efficient solutions combining React, Node, MongoDB and Tailwind. Passionate about innovation and careful design.",
    download_cv: "Download CV", 
    loading: "Loading...", 
    error_loading: "Error loading Hero data",

    // About
    error_loading_about: "Error loading About section data",
    about_fallback_description: "Passionate about modern web development, I design powerful and elegant solutions.",
    
    // Experience
    present: "Present",
    view_certificate: "View Certificate",
    proof_document: "Proof Document",
    no_experience: "No experience available yet.",
    error_loading_experiences: "Error loading experience data",

    // Formations
    view_diploma: "View Diploma",
    view_transcript: "View Transcript",
    no_formations: "No education records found.",
    error_loading_formations: "Error loading education data",
    
    // Projets
    code: "Code",
    demo: "Demo",
    no_projects: "No projects available yet.",
    error_loading_projects: "Error loading projects data",

    // Compétences (Skills)
    skills_title: "Technical Skills",
    loading_skills: "Loading skills...",
    error_loading_skills: "Error loading skills data",
    no_skills: "No skills recorded.",
    category_frontend: "Frontend",
    category_backend: "Backend",
    category_database: "Databases",
    category_tools: "Tools & Others",
    category_other: "Other",

    // ✅ NOUVEAU : Contact
    "contact_title": "Get In Touch",
    "copied_success": "Copied ✅"
  },
  de: {
    // Navigation
    about: "Über mich", 
    experience: "Erfahrungen", 
    formations: "Ausbildung", 
    projects: "Projekte", 
    contact: "Kontakt", 
    admin: "Admin",

    // Hero
    fullstack_developer: "MERN Full Stack Entwickler", 
    hero_description: "Ich entwerfe moderne und effiziente Lösungen, die React, Node, MongoDB und Tailwind kombinieren. Leidenschaft für Innovation und sorgfältiges Design.",
    download_cv: "Lebenslauf herunterladen", 
    loading: "Laden...", 
    error_loading: "Fehler beim Laden der Hero-Daten",
    
    // About
    error_loading_about: "Fehler beim Laden der Sektion Über mich",
    about_fallback_description: "Ich bin leidenschaftlich an moderner Webentwicklung interessiert und entwerfe leistungsstarke und elegante Lösungen.",
    
    // Experience
    present: "Gegenwärtig",
    view_certificate: "Bescheinigung ansehen",
    proof_document: "Nachweisdokument",
    no_experience: "Derzeit keine Erfahrung.",
    error_loading_experiences: "Fehler beim Laden der Erfahrungsdaten",

    // Formations
    view_diploma: "Diplom ansehen",
    view_transcript: "Zeugnis ansehen",
    no_formations: "Keine Ausbildungsnachweise gefunden.",
    error_loading_formations: "Fehler beim Laden der Ausbildungsdaten",
    
    // Projets
    code: "Code",
    demo: "Demo",
    no_projects: "Derzeit keine Projekte verfügbar.",
    error_loading_projects: "Fehler beim Laden der Projektdaten",

    // Compétences (Skills)
    skills_title: "Technische Fähigkeiten",
    loading_skills: "Fähigkeiten werden geladen...",
    error_loading_skills: "Fehler beim Laden der Fähigkeiten",
    no_skills: "Keine Fähigkeiten aufgezeichnet.",
    category_frontend: "Frontend",
    category_backend: "Backend",
    category_database: "Datenbanken",
    category_tools: "Tools & Sonstiges",
    category_other: "Sonstiges",

    // ✅ NOUVEAU : Contact
    "contact_title": "Kontakt",
    "copied_success": "Kopiert ✅"
  },
  tr: {
    // Navigation
    about: "Hakkında", 
    experience: "Deneyimler", 
    formations: "Eğitimler", 
    projects: "Projeler", 
    contact: "İletişim", 
    admin: "Yönetici",

    // Hero
    fullstack_developer: "MERN Full Stack Geliştiricisi", 
    hero_description: "React, Node, MongoDB ve Tailwind'i birleştiren modern ve verimli çözümler tasarlıyorum. Yenilikçiliğe ve özenli tasarıma tutkunum.",
    download_cv: "CV indir", 
    loading: "Yükleniyor...", 
    error_loading: "Hero verileri yüklenirken hata oluştu",
    
    // About
    error_loading_about: "Hakkında bölümü verileri yüklenirken hata oluştu",
    about_fallback_description: "Modern web geliştirmeye tutkunum, güçlü ve zarif çözümler tasarlıyorum.",

    // Experience
    present: "Mevcut",
    view_certificate: "Sertifikayı Gör",
    proof_document: "Kanıt Belgesi",
    no_experience: "Şu anda deneyim yok.",
    error_loading_experiences: "Deneyim verileri yüklenirken hata oluştu",

    // Formations
    view_diploma: "Diplomayı Gör",
    view_transcript: "Not Dökümünü Gör",
    no_formations: "Eğitim kaydı bulunamadı.",
    error_loading_formations: "Eğitim verileri yüklenirken hata oluştu",
    
    // Projets
    code: "Kod",
    demo: "Demo",
    no_projects: "Şu anda proje mevcut değil.",
    error_loading_projects: "Projeler yüklenirken hata oluştu",

    // Compétences (Skills)
    skills_title: "Teknik Yetenekler",
    loading_skills: "Yetenekler yükleniyor...",
    error_loading_skills: "Yetenek verileri yüklenirken hata oluştu",
    no_skills: "Kayıtlı yetenek yok.",
    category_frontend: "Ön Uç (Frontend)",
    category_backend: "Arka Uç (Backend)",
    category_database: "Veritabanları",
    category_tools: "Araçlar ve Diğerleri",
    category_other: "Diğer",
    
    // ✅ NOUVEAU : Contact
    "contact_title": "İletişime Geçin",
    "copied_success": "Kopyalandı ✅"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('appLang') as Language;
    return savedLang || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('appLang', language);
  }, [language]);

  const changeLanguage = (lang: Language) => setLanguage(lang);
  
  // La fonction t retourne la clé si aucune traduction n'est trouvée
  const t = (key: string): string => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};