import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, FileText, JapaneseYen } from 'lucide-react';
import { worksData } from '../data/works';
import { useEffect } from 'react';
import { CTA } from '../components/CTA';

interface WorksProps {
  onPageChange: (page: string) => void;
}

export const Works = ({ onPageChange }: WorksProps) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20">
        <div className="absolute inset-0">
          <div className="absolute -top-10 left-10 w-72 h-72 bg-[#3F87F5]/20 rounded-full filter blur-3xl opacity-50" />
          <div className="absolute -bottom-10 right-10 w-96 h-96 bg-[#32E2C4]/20 rounded-full filter blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#3F87F5] via-[#32E2C4] to-[#50FA7B] bg-clip-text text-transparent">
                {t('works.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('works.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Works List Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {worksData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 w-full">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="aspect-[4/3] bg-gray-800 overflow-y-auto rounded-xl shadow-lg">
                        <img
                          src={project.image}
                          alt={t(project.titleKey)}
                          className="w-full object-top transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </a>
                  </div>

                  <div className="md:w-1/2 w-full">
                    <h3 className="text-3xl font-bold text-white mb-4">{t(project.titleKey)}</h3>
                    <p className="text-gray-300 mb-6">{t(project.descriptionKey)}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="flex items-center justify-center text-gray-300 bg-gray-900 rounded-lg p-3">
                        <FileText className="w-5 h-5 mr-3 text-[#3F87F5]" />
                        <span className="text-lg font-semibold">{t('works.pageCount', { count: project.pageCount })}</span>
                      </div>
                      <div className="flex items-center justify-center text-gray-300 bg-gray-900 rounded-lg p-3">
                        <JapaneseYen className="w-5 h-5 mr-3 text-[#50FA7B]" />
                        <span className="text-lg font-semibold">{project.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {project.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start text-gray-300">
                          <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-[#32E2C4] flex-shrink-0" />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[#50FA7B] hover:text-[#50FA7B]/90 font-semibold flex items-center group">
                        {t('works.visitSite')}
                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTA onCTAClick={() => onPageChange('quote')} />
    </div>
  );
}; 