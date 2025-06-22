import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, FileText, JapaneseYen } from 'lucide-react';
import { worksData } from '../data/works';

interface WorksProps {
  onPageChange: (page: string) => void;
}

export const Works = ({ onPageChange }: WorksProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
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
        <div className="space-y-24">
          {worksData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:w-1/2 w-full">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="aspect-[4/3] bg-gray-800 overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={project.image}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover object-top scroll-animation"
                    />
                  </div>
                </a>
              </div>

              <div className="md:w-1/2 w-full">
                <h3 className="text-3xl font-bold text-white mb-4">{t(project.titleKey)}</h3>
                <p className="text-gray-300 mb-6">{t(project.descriptionKey)}</p>

                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center justify-center text-gray-300 bg-gray-900/50 rounded-lg p-3">
                    <FileText className="w-5 h-5 mr-3 text-[#3F87F5]" />
                    <span className="text-lg font-semibold">{t('works.pageCount', { count: project.pageCount })}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-300 bg-gray-900/50 rounded-lg p-3">
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 