import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, FileText, ArrowLeft } from 'lucide-react';

interface PrivacyProps {
  onPageChange: (page: string) => void;
}

export const Privacy = ({ onPageChange }: PrivacyProps) => {
  const { t } = useTranslation('common');

  const articles = (t('privacy.articles', { returnObjects: true }) || []) as { title: string; content: string }[];
  const overview = t('privacy.overview');

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3F87F5]/20 via-[#32E2C4]/20 to-[#50FA7B]/20 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-gray-100/50" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-teal-600 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                  {t('privacy.title')}
              </h1>
            </div>
            <p className="text-xl text-gray-600">{t('privacy.lastUpdated')}</p>
          </motion.div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => onPageChange('home')}
            className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('privacy.backToHome')}</span>
          </motion.button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm"
          >
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-600">{overview}</p>
            </div>
            <div className="space-y-12">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-200 last:border-b-0 pb-8 last:pb-0"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {article.title}
                      </h2>
                      <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {article.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('privacy.contact.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('privacy.contact.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange('contact')}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-colors duration-200"
            >
              {t('privacy.contact.button')}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
