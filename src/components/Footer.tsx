import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export const Footer = ({ onPageChange }: FooterProps) => {
  const { t } = useTranslation('common');

  // ソリューション各子ページ
  const solutionLinks = [
    { key: 'solutions/restaurant', label: t('nav.solutions.restaurant') },
    { key: 'solutions/education', label: t('nav.solutions.education') },
    { key: 'solutions/beauty', label: t('nav.solutions.beauty') },
    { key: 'solutions/travel', label: t('nav.solutions.travel') },
    { key: 'solutions/ecommerce', label: t('nav.solutions.ecommerce') },
    { key: 'solutions/freelance', label: t('nav.solutions.freelance') },
    { key: 'solutions/common', label: t('nav.solutions.common') },
  ];

  // 実績とサービス
  const serviceLinks = [
    { key: 'works', label: t('nav.service') },
    // 料金の2つのアンカーへ
    { key: 'pricing#plans', label: t('pricing.table.title') },
    { key: 'pricing#options', label: t('pricing.options.title') },
  ];

  const companyLinks = [
    { key: 'about', label: t('nav.about') },
    { key: 'privacy', label: t('nav.privacy') },
    { key: 'terms', label: t('nav.terms') },
  ];

  // サポート
  const supportLinks = [
    { key: 'home#flow', label: t('flow.hero.title') },
    { key: 'contact', label: t('nav.contact') },
    { key: 'news', label: t('nav.news') },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-gray-200" style={{ backgroundColor: '#F6FAFF' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row" style={{ gap: '3rem' }}>
          {/* Column 1: Brand */}
          <div className="flex-shrink-0 w-full lg:w-96 mb-12 lg:mb-0">
            <div
              className="inline-flex items-center space-x-2 mb-4 cursor-pointer"
              onClick={() => onPageChange('home')}
            >
              <img src="/images/logo_nomoji.svg" alt={t('footer.company')} className="w-9 h-9" />
              <span className="text-xl font-bold text-gray-900">{t('footer.company')}</span>
            </div>
            <p className="text-[#0EA5FF] font-medium mb-4 text-sm">{t('footer.slogan')}</p>
            <p className="text-gray-600 text-sm">
              {t('footer.description')}
            </p>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row" style={{ gap: '3rem' }}>
              {/* Column: Solutions - 分为两列 */}
              <div className="flex-shrink-0">
                <h3 className="text-gray-900 font-semibold mb-4 text-center text-sm">{t('nav.solutions.title')}</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Solutions 第一列 */}
                  <div>
                    <ul className="space-y-3">
                      {solutionLinks.slice(0, Math.ceil(solutionLinks.length / 2)).map((link) => (
                        <li key={link.key}>
                          <button
                            onClick={() => onPageChange(link.key)}
                            className="flex items-center text-gray-700 hover:text-[#0EA5FF] transition-colors duration-200 text-sm group"
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Solutions 第二列 */}
                  <div>
                    <ul className="space-y-3">
                      {solutionLinks.slice(Math.ceil(solutionLinks.length / 2)).map((link) => (
                        <li key={link.key}>
                          <button
                            onClick={() => onPageChange(link.key)}
                            className="flex items-center text-gray-700 hover:text-[#0EA5FF] transition-colors duration-200 text-sm group"
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column 2: Service Links */}
              <div className="flex-shrink-0" style={{ minWidth: '160px' }}>
                <h3 className="text-gray-900 font-semibold mb-4 whitespace-nowrap text-sm">{t('footer.links.services')}</h3>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => {
                          if (link.key.startsWith('pricing#')) {
                            // 跳转到料金页并滚动锚点
                            onPageChange('pricing');
                            setTimeout(() => {
                              const id = link.key.split('#')[1];
                              const el = document.getElementById(id);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 0);
                          } else {
                            onPageChange(link.key);
                          }
                        }}
                        className="flex items-center text-gray-700 hover:text-[#0EA5FF] transition-colors duration-200 text-sm group whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Company Links */}
              <div className="flex-shrink-0" style={{ minWidth: '140px' }}>
                <h3 className="text-gray-900 font-semibold mb-4 whitespace-nowrap text-sm">{t('footer.links.company')}</h3>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => onPageChange(link.key)}
                        className="flex items-center text-gray-700 hover:text-[#0EA5FF] transition-colors duration-200 text-sm group whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Support */}
              <div className="flex-shrink-0" style={{ minWidth: '120px' }}>
                <h3 className="text-gray-900 font-semibold mb-4 whitespace-nowrap text-sm">{t('footer.links.support')}</h3>
                <ul className="space-y-3">
                  {supportLinks.map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => {
                          if (link.key === 'home#flow') {
                            onPageChange('home');
                            setTimeout(() => {
                              const el = document.getElementById('flow');
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 0);
                          } else {
                            onPageChange(link.key);
                          }
                        }}
                        className="flex items-center text-gray-700 hover:text-[#0EA5FF] transition-colors duration-200 text-sm group whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
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