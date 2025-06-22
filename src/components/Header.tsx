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
    { key: 'works', label: t('nav.works') },
    { key: 'service', label: t('nav.service') },
    { key: 'pricing', label: t('nav.pricing') },
    { key: 'flow', label: t('nav.flow') },
    { key: 'about', label: t('nav.about') },
  ];

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            {/* [修正] アイコン部分をimgタグに変更 */}
            <img src="/images/logo_nomoji.svg" alt="MiniMaxCode Logo" className="w-8 h-8 logo-glow" />
            <span className="text-xl font-bold text-white">MiniMaxCode</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.key
                    ? 'text-[#32E2C4]'
                    : 'text-gray-300 hover:text-[#32E2C4]'
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
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 border-2 border-[#3F87F5] text-[#3F87F5] font-medium rounded-lg hover:bg-[#3F87F5] hover:text-white transition-colors duration-200 text-sm"
            >
              {t('nav.contact')}
            </button>
            <button
              onClick={() => handleNavClick('quote')}
              className="px-4 py-2 bg-[#50FA7B] text-black font-medium rounded-lg hover:bg-[#50FA7B]/90 transition-colors duration-200 text-sm"
            >
              {t('nav.quote')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-[#32E2C4] transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0D0D0D] border-b border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`block w-full text-left py-2 text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.key
                      ? 'text-[#32E2C4]'
                      : 'text-gray-300 hover:text-[#32E2C4]'
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
                      onClick={() => handleNavClick('contact')}
                      className="px-4 py-2 border-2 border-[#3F87F5] text-[#3F87F5] font-medium rounded-lg hover:bg-[#3F87F5] hover:text-white transition-colors duration-200 text-sm"
                    >
                      {t('nav.contact')}
                    </button>
                    <button
                      onClick={() => handleNavClick('quote')}
                      className="px-4 py-2 bg-[#50FA7B] text-black font-medium rounded-lg hover:bg-[#50FA7B]/90 transition-colors duration-200 text-sm"
                    >
                      {t('nav.quote')}
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