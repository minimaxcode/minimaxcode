import { useTranslation } from 'react-i18next';
import { useState } from 'react';
// [修正] Codeアイコンは不要になったため、インポートから削除
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header = ({ currentPage, onPageChange }: HeaderProps) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'works', label: t('nav.service') },
    { key: 'pricing', label: t('nav.pricing') },
    { key: 'flow', label: t('nav.flow') },
    { key: 'about', label: t('nav.about') },
  ];

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img src="/images/logo_nomoji.svg" alt="MiniMaxCode Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">MiniMaxCode</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-md ${
                  currentPage === item.key
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => handleNavClick('quote')}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 text-sm shadow-sm"
            >
              {t('nav.quote')}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 border border-purple-300 text-purple-600 font-medium rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-colors duration-200 text-sm"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`block w-full text-left py-2 text-sm font-medium transition-colors duration-200 rounded-md px-3 ${
                    currentPage === item.key
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleNavClick('quote')}
                      className="px-4 py-2 bg-[#50FA7B] text-black font-medium rounded-lg hover:bg-[#50FA7B]/90 transition-colors duration-200 text-sm"
                    >
                      {t('nav.quote')}
                    </button>
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="px-4 py-2 border-2 border-purple-400 text-purple-600 font-medium rounded-lg hover:bg-purple-50 hover:border-purple-500 transition-colors duration-200 text-sm"
                    >
                      {t('nav.contact')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};