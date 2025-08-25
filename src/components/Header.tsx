import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
// [修正] Codeアイコンは不要になったため、インポートから削除
import { Menu, X, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header = ({ currentPage, onPageChange }: HeaderProps) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigationItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'works', label: t('nav.service') },
    { key: 'pricing', label: t('nav.pricing') },
  ];

  const solutionItems = [
    { key: 'restaurant', label: t('nav.solutions.restaurant') },
    { key: 'education', label: t('nav.solutions.education') },
    { key: 'beauty', label: t('nav.solutions.beauty') },
    { key: 'travel', label: t('nav.solutions.travel') },
    { key: 'ecommerce', label: t('nav.solutions.ecommerce') },
    { key: 'freelance', label: t('nav.solutions.freelance') },
    { key: 'common', label: t('nav.solutions.common') },
  ];

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  const handleSolutionsMouseEnter = () => {
    if (solutionsTimeoutRef.current) {
      clearTimeout(solutionsTimeoutRef.current);
      solutionsTimeoutRef.current = null;
    }
    setIsSolutionsOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 150); // 150ms延迟
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200" style={{ backgroundColor: '#F6FAFF' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img src="/images/logo_nomoji.svg" alt="MiniMaxCode Logo" className="w-8 h-8" />
            <span className="text-lg md:text-xl xl:text-2xl font-bold text-gray-900">MiniMaxCode</span>
          </div>

          {/* Desktop Navigation */}
          {/* 将导航提升到 lg 断点显示，避免 768/820 宽度拥挤 */}
          <nav className="hidden lg:flex items-center lg:space-x-6 xl:space-x-8">
            {navigationItems.map((item, index) => (
              <div key={item.key}>
                <button
                  onClick={() => handleNavClick(item.key)}
                  className={`text-sm xl:text-base font-medium transition-colors duration-200 px-2 xl:px-3 py-2 rounded-md ${
                    currentPage === item.key
                      ? 'text-[#0EA5FF] bg-white'
                      : 'text-gray-700 hover:text-[#0EA5FF]'
                  }`}
                >
                  {item.label}
                </button>
                {/* 在ホーム后面添加解决方案下拉菜单 */}
                {item.key === 'home' && (
                  <div 
                    className="relative inline-block lg:ml-6 xl:ml-8"
                    onMouseEnter={handleSolutionsMouseEnter}
                    onMouseLeave={handleSolutionsMouseLeave}
                  >
                    <button className="text-sm xl:text-base font-medium text-gray-700 hover:text-[#0EA5FF] transition-colors duration-200 px-2 xl:px-3 py-2 rounded-md flex items-center space-x-1">
                      <span>{t('nav.solutions.title')}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* 下拉菜单 */}
                    {isSolutionsOpen && (
                      <div 
                        className="absolute top-full left-0 w-48 xl:w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        onMouseEnter={handleSolutionsMouseEnter}
                        onMouseLeave={handleSolutionsMouseLeave}
                      >
                        {solutionItems.map((solution) => (
                          <button
                            key={solution.key}
                            onClick={() => {
                              if (solution.key === 'restaurant') {
                                handleNavClick('solutions/restaurant');
                              } else if (solution.key === 'education') {
                                handleNavClick('solutions/education');
                              } else if (solution.key === 'beauty') {
                                handleNavClick('solutions/beauty');
                              } else if (solution.key === 'travel') {
                                handleNavClick('solutions/travel');
                              } else if (solution.key === 'ecommerce') {
                                handleNavClick('solutions/ecommerce');
                              } else if (solution.key === 'freelance') {
                                handleNavClick('solutions/freelance');
                              } else if (solution.key === 'common') {
                                handleNavClick('solutions/common');
                              } else {
                                // 其他页面跳转到home
                                handleNavClick('home');
                              }
                              setIsSolutionsOpen(false);
                              if (solutionsTimeoutRef.current) {
                                clearTimeout(solutionsTimeoutRef.current);
                                solutionsTimeoutRef.current = null;
                              }
                            }}
                            className="w-full text-left px-4 py-2 text-sm xl:text-base text-gray-700 hover:text-[#0EA5FF] hover:bg-gray-50 transition-colors duration-200"
                          >
                            {solution.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mid-size Navigation: 768–1023 显示精简导航（ホーム/ソリューション/制作実績/料金）*/}
          <nav className="hidden md:flex lg:hidden items-center space-x-3">
            {[...navigationItems.filter(i => ['home','works','pricing'].includes(i.key))].map((item) => (
              <div key={`md-${item.key}`}>
                <button
                  onClick={() => handleNavClick(item.key)}
                  className={`text-xs sm:text-sm font-medium transition-colors duration-200 px-2 py-1.5 rounded-md ${
                    currentPage === item.key
                      ? 'text-[#0EA5FF] bg-white'
                      : 'text-gray-700 hover:text-[#0EA5FF]'
                  }`}
                >
                  {item.label}
                </button>
                {item.key === 'home' && (
                  <div
                    className="relative inline-block ml-3"
                    onMouseEnter={handleSolutionsMouseEnter}
                    onMouseLeave={handleSolutionsMouseLeave}
                  >
                    <button className="text-xs sm:text-sm font-medium text-gray-700 hover:text-[#0EA5FF] transition-colors duration-200 px-2 py-1.5 rounded-md flex items-center space-x-1">
                      <span>{t('nav.solutions.title')}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isSolutionsOpen && (
                      <div
                        className="absolute top-full left-0 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        onMouseEnter={handleSolutionsMouseEnter}
                        onMouseLeave={handleSolutionsMouseLeave}
                      >
                        {solutionItems.map((solution) => (
                          <button
                            key={`md-${solution.key}`}
                            onClick={() => {
                              const key = solution.key === 'common' ? 'solutions/common' : `solutions/${solution.key}`;
                              handleNavClick(key);
                              setIsSolutionsOpen(false);
                              if (solutionsTimeoutRef.current) {
                                clearTimeout(solutionsTimeoutRef.current);
                                solutionsTimeoutRef.current = null;
                              }
                            }}
                            className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:text-[#0EA5FF] hover:bg-gray-50 transition-colors duration-200"
                          >
                            {solution.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Language Switcher & CTA：1024 下隐藏，仅 >=1280 显示 */}
          <div className="hidden xl:flex items-center space-x-3">
            <LanguageSwitcher />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleNavClick('quote')}
                className="px-7 py-3 bg-gradient-to-r from-[#33C6FF] to-[#0EA5FF] text-white font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                {t('nav.quote')}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="px-7 py-3 bg-gradient-to-r from-[#0EA5FF] to-[#6A7DFF] text-white font-semibold text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          {/* 移动端/平板/1024 显示折叠菜单按钮（<1280）*/}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 text-gray-700 hover:text-[#0EA5FF] transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu (visible on <xl) - constrained to header container width */}
        {isMenuOpen && (
          <div
            className="xl:hidden absolute top-full left-0 right-0 overflow-y-auto border-b border-gray-200 shadow-lg z-50 max-h-[calc(100vh-var(--header-h))]"
            style={{ backgroundColor: '#F6FAFF' }}
          >
            <div className="px-4 py-3 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`block w-full text-left py-2 text-sm font-medium transition-colors duration-200 rounded-md px-3 ${
                    currentPage === item.key
                      ? 'text-[#0EA5FF] bg-white'
                      : 'text-gray-700 hover:text-[#0EA5FF] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Solutions Section */}
              <div className="pt-3 border-t border-gray-200">
                <h3 className="px-3 py-2 text-sm font-semibold text-gray-900">
                  {t('nav.solutions.title')}
                </h3>
                <div className="space-y-1">
                  {solutionItems.map((solution) => (
                    <button
                      key={solution.key}
                      onClick={() => {
                        const key = solution.key === 'common' ? 'solutions/common' : `solutions/${solution.key}`;
                        handleNavClick(key);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-sm rounded-md px-3 text-gray-700 hover:text-[#0EA5FF] hover:bg-gray-50 transition-colors duration-200"
                    >
                      {solution.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleNavClick('quote')}
                      className="px-4 py-2 bg-gradient-to-r from-[#33C6FF] to-[#0EA5FF] text-white font-medium rounded-md hover:opacity-90 transition-opacity duration-200 text-sm"
                    >
                      {t('nav.quote')}
                    </button>
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="px-4 py-2 bg-gradient-to-r from-[#0EA5FF] to-[#6A7DFF] text-white font-medium rounded-md hover:opacity-90 transition-opacity duration-200 text-sm"
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