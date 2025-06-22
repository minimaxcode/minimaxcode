import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ja', name: t('language.ja') },
    { code: 'en', name: t('language.en') },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-[#32E2C4] transition-colors duration-200 border border-gray-700 rounded-lg hover:border-[#32E2C4]"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                i18n.language === language.code
                  ? 'bg-[#3F87F5] text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-[#32E2C4]'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
