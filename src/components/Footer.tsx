import { useTranslation } from 'react-i18next';
// [修正] Codeアイコンは不要になったため、インポートから削除
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export const Footer = ({ onPageChange }: FooterProps) => {
  const { t } = useTranslation();

  const serviceLinks = [
    { key: 'service', label: t('nav.service') },
    { key: 'pricing', label: t('nav.pricing') },
    { key: 'flow', label: t('nav.flow') },
    { key: 'quote', label: t('nav.quote') },
  ];

  const companyLinks = [
    { key: 'about', label: t('nav.about') },
    { key: 'contact', label: t('nav.contact') },
  ];

  const legalLinks = [
    { key: 'privacy', label: t('nav.privacy') },
    { key: 'terms', label: t('nav.terms') },
  ];

  return (
    <footer className="bg-[#0D0D0D] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* [修正] アイコン部分をimgタグに変更。alt属性には翻訳テキストを使用 */}
              <img src="/images/logo_nomoji.svg" alt={t('footer.company')} className="w-8 h-8" />
              <span className="text-xl font-bold text-white">{t('footer.company')}</span>
            </div>
            <p className="text-[#32E2C4] font-medium mb-2">{t('footer.slogan')}</p>
            <div className="flex items-center space-x-2 text-gray-400 mb-4">
              <span>{t('footer.domain')}</span>
              <ExternalLink className="w-4 h-4" />
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              {t('home.hero.description')}
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.links.services')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onPageChange(link.key)}
                    className="text-gray-400 hover:text-[#32E2C4] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.links.company')}</h3>
            <ul className="space-y-2 mb-6">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onPageChange(link.key)}
                    className="text-gray-400 hover:text-[#32E2C4] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mb-4">{t('footer.links.legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onPageChange(link.key)}
                    className="text-gray-400 hover:text-[#32E2C4] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
            <button
              onClick={() => onPageChange('quote')}
              className="px-6 py-2 bg-[#50FA7B] text-black font-medium rounded-lg hover:bg-[#50FA7B]/90 transition-colors duration-200"
            >
              {t('home.hero.cta')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};