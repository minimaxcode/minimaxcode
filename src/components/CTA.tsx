import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onCTAClick: () => void;
}

export const CTA = ({ onCTAClick }: CTAProps) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            {t('cta.description')}
          </p>
          <button
            onClick={onCTAClick}
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#0EA5FF] rounded-lg hover:bg-[#0284C7] transition-colors duration-300"
          >
            <span className="flex items-center">
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}; 