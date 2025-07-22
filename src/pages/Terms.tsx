import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Scale, ArrowLeft, ShieldCheck, CheckSquare } from 'lucide-react';

interface TermsProps {
  onPageChange: (page: string) => void;
}

export const Terms = ({ onPageChange }: TermsProps) => {
  const { t } = useTranslation('common');

  // Assuming 'terms.articles' and 'terms.summary' are structured in your JSON files
  const articles = (t('terms.articles', { returnObjects: true }) || []) as { title: string; content: string }[];
  const summary = (t('terms.summary', { returnObjects: true }) || { title: '', items: [] }) as { title: string; items: string[] };

  return (
        <div className="min-h-screen bg-white text-gray-900 pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3F87F5]/20 via-[#32E2C4]/20 to-[#50FA7B]/20 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-gray-100/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                {t('terms.title')}
            </h1>
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
            <span>{t('terms.backToHome')}</span>
          </motion.button>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 space-y-12 shadow-sm"
          >
            {/* Articles Section */}
            {articles.map((article, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
                </div>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed pl-9">
                  {article.content}
                </p>
              </div>
            ))}

            {/* Summary Section */}
            {summary && summary.items && summary.items.length > 0 && (
              <div className="border-t border-gray-200 pt-12 mt-12 space-y-6">
                 <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-7 h-7 text-emerald-600" />
                  <h2 className="text-3xl font-bold text-gray-900">{summary.title}</h2>
                </div>
                <ul className="space-y-4 pl-10">
                  {summary.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckSquare className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-8"
          >
            <div className="flex items-start space-x-4">
              <FileText className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.importantNotice.title')}</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong className="text-emerald-600">{t('terms.importantNotice.contract.title')}</strong>
                    {t('terms.importantNotice.contract.content')}
                  </p>
                  <p>
                    <strong className="text-emerald-600">{t('terms.importantNotice.payment.title')}</strong>
                    {t('terms.importantNotice.payment.content')}
                  </p>
                  <p>
                    <strong className="text-emerald-600">{t('terms.importantNotice.qualityAssurance.title')}</strong>
                    {t('terms.importantNotice.qualityAssurance.content')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('terms.questions.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('terms.questions.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('contact')}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-colors duration-200"
              >
                {t('terms.questions.contactButton')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('works')}
                className="px-8 py-4 border-2 border-teal-500 text-teal-600 font-bold text-lg rounded-xl hover:bg-teal-500 hover:text-white transition-colors duration-200"
              >
                {t('terms.questions.serviceButton')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
