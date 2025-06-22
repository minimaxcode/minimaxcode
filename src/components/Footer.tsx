import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export const Footer = ({ onPageChange }: FooterProps) => {
  const { t } = useTranslation('common');

  const serviceLinks = [
    { key: 'service', label: t('nav.service') },
    { key: 'works', label: t('nav.works') },
    { key: 'pricing', label: t('nav.pricing') },
    { key: 'flow', label: t('nav.flow') },
  ];

  const companyLinks = [
    { key: 'about', label: t('nav.about') },
    { key: 'privacy', label: t('nav.privacy') },
    { key: 'terms', label: t('nav.terms') },
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:flex">
          {/* Column 1: Brand */}
          <div className="lg:w-1/3 lg:pr-12 mb-12 lg:mb-0">
            <div 
              className="inline-flex items-center space-x-2 mb-4 cursor-pointer"
              onClick={() => onPageChange('home')}
            >
              <img src="/images/logo_nomoji.svg" alt={t('footer.company')} className="w-8 h-8 logo-glow" />
              <span className="text-xl font-bold text-white">{t('footer.company')}</span>
            </div>
            <p className="text-[#32E2C4] font-medium mb-4">{t('footer.slogan')}</p>
            <p className="text-gray-400 text-sm">
              {t('footer.description')}
            </p>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Column 2: Service Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">{t('footer.links.services')}</h3>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => onPageChange(link.key)}
                        className="flex items-center text-gray-400 hover:text-[#32E2C4] transition-colors duration-200 text-sm group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 text-gray-600 group-hover:text-[#32E2C4] transition-colors" />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Company Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">{t('footer.links.company')}</h3>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => onPageChange(link.key)}
                        className="flex items-center text-gray-400 hover:text-[#32E2C4] transition-colors duration-200 text-sm group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 text-gray-600 group-hover:text-[#32E2C4] transition-colors" />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Column 4: Action Buttons */}
              <div>
                <h3 className="text-white font-semibold mb-4">{t('footer.links.actions')}</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => onPageChange('quote')}
                    className="w-full px-6 py-3 bg-[#50FA7B] text-black font-bold rounded-lg hover:bg-[#50FA7B]/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>{t('nav.quote')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onPageChange('contact')}
                    className="w-full px-6 py-3 border-2 border-[#3F87F5] text-[#3F87F5] font-bold rounded-lg hover:bg-[#3F87F5] hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>{t('nav.contact')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};