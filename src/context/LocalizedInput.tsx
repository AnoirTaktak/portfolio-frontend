// src/components/Admin/LocalizedInput.tsx
import React, { useState } from 'react';
import { useTheme } from '../components/ThemeContext'; // Assurez-vous d'avoir ce contexte

import { LocalizedText } from '../types/adminData';
import { Globe } from 'lucide-react';

const availableLanguages = ['fr', 'en', 'de', 'tr'];

interface LocalizedInputProps {
    label: string;
    localizedText: LocalizedText;
    onUpdate: (lang: string, value: string) => void;
    type?: 'input' | 'textarea';
    className?: string;
    placeholderPrefix?: string;
}

// L'exportation nommée est la bonne façon de faire si vous importez avec { LocalizedInput }
export const LocalizedInput: React.FC<LocalizedInputProps> = ({ 
    label, 
    localizedText, 
    onUpdate, 
    type = 'input', 
    className = '', 
    placeholderPrefix = '' 
}) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeLang, setActiveLang] = useState(availableLanguages[0]);

    const inputStyle = `w-full p-3 rounded border focus:ring-2 transition outline-none ${isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-600'}`;

    const LangInput = type === 'textarea' ? 'textarea' : 'input';

    return (
        <div className={`p-4 rounded-lg border ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-white/50'} ${className}`}>
            <label className="block text-sm font-medium mb-3 flex items-center text-blue-300">
                <Globe size={16} className="mr-2" /> {label} (Multilingue)
            </label>

            {/* Onglets de Langue */}
            <div className="flex flex-wrap gap-2 mb-4">
                {availableLanguages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        className={`px-3 py-1 text-sm rounded transition ${
                            activeLang === lang
                                ? 'bg-blue-600 text-white shadow-md'
                                : isDark ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Champ de Saisie Actif */}
            <div className="relative">
                <LangInput
                    value={localizedText[activeLang] || ''}
                    // Correction du typage de l'événement onChange
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onUpdate(activeLang, e.target.value)}
                    placeholder={`${placeholderPrefix} en ${activeLang.toUpperCase()}`}
                    rows={type === 'textarea' ? 3 : undefined}
                    className={`${inputStyle}`}
                />
                <div className="absolute top-0 right-0 p-3 text-xs text-red-400 font-semibold">{localizedText[activeLang] ? '' : '⚠️ Champ vide'}</div>
            </div>
        </div>
    );
};