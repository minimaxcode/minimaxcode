import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { worksData } from '../data/works';
import { ArrowRight, FileText, JapaneseYen, CheckCircle } from 'lucide-react';

interface WorksSummaryProps {
  onPageChange: (page: string) => void;
}

export const WorksSummary = ({ onPageChange }: WorksSummaryProps) => {
  const { t } = useTranslation('common');
  const displayedWorks = worksData.slice(0, 2);

  return (
    <section className="py-20 bg-gray-900/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('works.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('works.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {displayedWorks.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onPageChange('works')}
              className="cursor-pointer group flex flex-col bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors duration-300"
            >
              <div className="aspect-[4/3] bg-gray-800 overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-4">{t(project.titleKey)}</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center text-gray-300 bg-gray-900/70 rounded-lg p-2 justify-center">
                    <FileText className="w-4 h-4 mr-2 text-[#3F87F5]" />
                    <span>{t('works.pageCount', { count: project.pageCount })}</span>
                  </div>
                  <div className="flex items-center text-gray-300 bg-gray-900/70 rounded-lg p-2 justify-center">
                    <JapaneseYen className="w-4 h-4 mr-2 text-[#50FA7B]" />
                    <span>{project.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 mt-2 flex-grow">
                  {project.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-[#32E2C4] flex-shrink-0" />
                      <span>{t(feature)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('works')}
                className="inline-flex items-center px-8 py-4 border-2 border-[#3F87F5] text-[#3F87F5] font-bold text-lg rounded-xl hover:bg-[#3F87F5] hover:text-white transition-colors duration-200"
            >
                {t('home.works.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
        </div>
      </div>
    </section>
  );
}; 