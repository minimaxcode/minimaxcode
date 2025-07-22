import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export const Footer = ({ onPageChange }: FooterProps) => {
  const { t } = useTranslation('common');

  const serviceLinks = [
    { key: 'works', label: t('nav.service') },
    { key: 'pricing', label: t('nav.pricing') },
    { key: 'flow', label: t('nav.flow') },
  ];

  const companyLinks = [
    { key: 'about', label: t('nav.about') },
    { key: 'privacy', label: t('nav.privacy') },
    { key: 'terms', label: t('nav.terms') },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#3F87F5]/20 via-[#32E2C4]/20 to-[#50FA7B]/20 border-t border-gray-200">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-gray-100/50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:flex">
          {/* Column 1: Brand */}
          <div className="lg:w-1/3 lg:pr-12 mb-12 lg:mb-0">
            <div
              className="inline-flex items-center space-x-2 mb-4 cursor-pointer"
              onClick={() => onPageChange('home')}
            >
              <img src="/images/logo_nomoji.svg" alt={t('footer.company')} className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">{t('footer.company')}</span>
            </div>
            <p className="text-teal-600 font-medium mb-4">{t('footer.slogan')}</p>
            <p className="text-gray-600 text-sm">
              {t('footer.description')}
            </p>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Column 2: Service Links */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">{t('footer.links.services')}</h3>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => onPageChange(link.key)}
                        className="flex items-center text-gray-600 hover:text-teal-600 transition-colors duration-200 text-sm group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-teal-600 transition-colors" />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Company Links */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">{t('footer.links.company')}</h3>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => onPageChange(link.key)}
                        className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm group"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Column 4: Action Buttons */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">{t('footer.links.actions')}</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => onPageChange('quote')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <span>{t('nav.quote')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onPageChange('contact')}
                    className="w-full px-6 py-3 border-2 border-violet-400 text-violet-600 font-semibold rounded-lg hover:bg-violet-50 hover:border-violet-500 transition-colors duration-200 flex items-center justify-center space-x-2"
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
        <div className="mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};