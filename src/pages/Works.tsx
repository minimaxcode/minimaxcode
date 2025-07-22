import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, FileText } from 'lucide-react';
import { worksData } from '../data/works';
import { useEffect } from 'react';


interface WorksProps {
  onPageChange: (page: string) => void;
}

export const Works = ({ onPageChange }: WorksProps) => {
  const { t } = useTranslation('common');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3F87F5]/20 via-[#32E2C4]/20 to-[#50FA7B]/20 pt-16 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-gray-100/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              <span className="bg-gradient-to-r from-[#3F87F5] via-[#32E2C4] to-[#50FA7B] bg-clip-text text-transparent">
                {t('works.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('works.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Works List Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {worksData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="lg:w-1/2 w-full flex-shrink-0">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={project.image}
                          alt={t(project.titleKey)}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </a>
                  </div>

                  <div className="lg:w-1/2 w-full min-w-0">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 break-words">{t(project.titleKey)}</h3>
                    <p className="text-gray-600 mb-6 break-words">{t(project.descriptionKey)}</p>

                    <div className="inline-flex items-center text-gray-700 bg-gray-50 rounded-lg px-4 py-2.5 mb-6">
                      <FileText className="w-4 h-4 mr-2 text-[#3F87F5] flex-shrink-0" />
                      <span className="text-base font-semibold">{t('works.pageCount', { count: project.pageCount })}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      {project.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start text-gray-600">
                          <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-[#32E2C4] flex-shrink-0" />
                          <span className="break-words">{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md group">
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
    </div>
  );
}; 