import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { DollarSign, Gift, Shield, Percent, ArrowRight, CheckCircle } from 'lucide-react';

interface PricingProps {
  onPageChange: (page: string) => void;
}

export const Pricing = ({ onPageChange }: PricingProps) => {
  const { t } = useTranslation();

  const transparencyItems = [
    t('pricing.transparency.examples.domain'),
    t('pricing.transparency.examples.server'),
    t('pricing.transparency.examples.workspace'),
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#50FA7B]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3F87F5]/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#50FA7B] via-[#32E2C4] to-[#3F87F5] bg-clip-text text-transparent">
                {t('pricing.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Comparison Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('pricing.comparison.title')}
            </h2>
            <p className="text-xl text-gray-300">{t('pricing.comparison.description')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Brand Site Comparison */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#3F87F5]/10 to-[#32E2C4]/10 border border-[#3F87F5]/30 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <DollarSign className="w-8 h-8 text-[#50FA7B] mr-3" />
                <h3 className="text-2xl font-bold text-white">{t('home.pricing.brandSite.title')}</h3>
              </div>
              <p className="text-gray-300 mb-6">{t('home.pricing.brandSite.description')}</p>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">{t('home.pricing.marketPriceLabel')}</p>
                  <p className="text-xl font-bold text-gray-400 line-through">{t('home.pricing.brandSite.marketPrice')}</p>
                </div>
                <div className="bg-gradient-to-r from-[#50FA7B]/20 to-[#32E2C4]/20 rounded-xl p-4 border border-[#50FA7B]/30">
                  <p className="text-[#50FA7B] text-sm mb-1 font-semibold">{t('home.pricing.ourPriceLabel')}</p>
                  <p className="text-3xl font-bold text-[#50FA7B]">{t('home.pricing.brandSite.ourPrice')}</p>
                  <p className="text-sm text-gray-300 mt-2">{t('home.pricing.brandSite.discount')}</p>
                </div>
              </div>
            </motion.div>

            {/* LP Comparison */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#32E2C4]/10 to-[#50FA7B]/10 border border-[#32E2C4]/30 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <DollarSign className="w-8 h-8 text-[#32E2C4] mr-3" />
                <h3 className="text-2xl font-bold text-white">{t('home.pricing.lp.title')}</h3>
              </div>
              <p className="text-gray-300 mb-6">{t('home.pricing.lp.description')}</p>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">{t('home.pricing.marketPriceLabel')}</p>
                  <p className="text-xl font-bold text-gray-400 line-through">{t('home.pricing.lp.marketPrice')}</p>
                </div>
                <div className="bg-gradient-to-r from-[#32E2C4]/20 to-[#3F87F5]/20 rounded-xl p-4 border border-[#32E2C4]/30">
                  <p className="text-[#32E2C4] text-sm mb-1 font-semibold">{t('home.pricing.ourPriceLabel')}</p>
                  <p className="text-3xl font-bold text-[#32E2C4]">{t('home.pricing.lp.ourPrice')}</p>
                  <p className="text-sm text-gray-300 mt-2">{t('home.pricing.lp.discount')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('pricing.campaigns.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* No Initial Cost */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#50FA7B]/10 to-[#32E2C4]/10 border border-[#50FA7B]/30 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-[#50FA7B] mr-3" />
                <h3 className="text-2xl font-bold text-white">{t('pricing.campaigns.noInitialCost.title')}</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t('pricing.campaigns.noInitialCost.description')}
              </p>
              <div className="bg-[#50FA7B]/10 border border-[#50FA7B]/20 rounded-xl p-4">
                <p className="text-[#50FA7B] font-semibold">{t('pricing.campaigns.noInitialCost.feature')}</p>
                <p className="text-gray-300 text-sm mt-1">{t('pricing.campaigns.noInitialCost.detail')}</p>
              </div>
            </motion.div>

            {/* Half Price Campaign */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#3F87F5]/10 to-[#32E2C4]/10 border border-[#3F87F5]/30 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <Percent className="w-8 h-8 text-[#3F87F5] mr-3" />
                <h3 className="text-2xl font-bold text-white">{t('pricing.campaigns.halfPrice.title')}</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t('pricing.campaigns.halfPrice.description')}
              </p>
              <div className="bg-[#3F87F5]/10 border border-[#3F87F5]/20 rounded-xl p-4">
                <p className="text-[#3F87F5] font-semibold">{t('pricing.campaigns.halfPrice.feature')}</p>
                <p className="text-gray-300 text-sm mt-1">{t('pricing.campaigns.halfPrice.detail')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('pricing.transparency.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              {t('pricing.transparency.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transparency Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <Gift className="w-8 h-8 text-[#32E2C4] mr-3" />
                <h3 className="text-2xl font-bold text-white">{t('pricing.transparency.feature')}</h3>
              </div>
              <ul className="space-y-4">
                {transparencyItems.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#50FA7B] flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-[#32E2C4]/10 border border-[#32E2C4]/20 rounded-xl p-4">
                <p className="text-[#32E2C4] font-semibold text-sm">{t('pricing.transparency.noHiddenFees')}</p>
              </div>
            </motion.div>

            {/* Industry Problem */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{t('pricing.transparency.industryProblems.title')}</h3>
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 font-semibold text-sm mb-2">{t('pricing.transparency.industryProblems.typicalAgency.title')}</p>
                  <p className="text-gray-300 text-sm">{t('pricing.transparency.industryProblems.typicalAgency.description')}</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                  <p className="text-orange-400 font-semibold text-sm mb-2">{t('pricing.transparency.industryProblems.opaqueStructure.title')}</p>
                  <p className="text-gray-300 text-sm">{t('pricing.transparency.industryProblems.opaqueStructure.description')}</p>
                </div>
                <div className="bg-[#50FA7B]/10 border border-[#50FA7B]/20 rounded-xl p-4">
                  <p className="text-[#50FA7B] font-semibold text-sm mb-2">{t('pricing.transparency.industryProblems.ourApproach.title')}</p>
                  <p className="text-gray-300 text-sm">{t('pricing.transparency.industryProblems.ourApproach.description')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('pricing.transparency.note')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('pricing.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('pricing.cta.subtitle')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange('quote')}
              className="px-8 py-4 bg-[#50FA7B] text-black font-bold text-lg rounded-xl hover:bg-[#50FA7B]/90 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>{t('pricing.cta.button')}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
