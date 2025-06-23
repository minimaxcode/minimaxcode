import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onCTAClick: () => void;
}

export const CTA = ({ onCTAClick }: CTAProps) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#1E1E1E] to-[#141414] border border-gray-800 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#50FA7B] via-[#32E2C4] to-[#3F87F5] bg-clip-text text-transparent">
              {t('cta.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            {t('cta.description')}
          </p>
          <button
            onClick={onCTAClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#50FA7B] via-[#32E2C4] to-[#3F87F5] rounded-full transition-all duration-300 ease-in-out overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#3F87F5] via-[#32E2C4] to-[#50FA7B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center">
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}; 