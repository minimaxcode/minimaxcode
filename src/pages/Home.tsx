import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Zap, Shield, Eye, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { WorksSummary } from '../components/WorksSummary';

interface HomeProps {
  onPageChange: (page: string) => void;
}

export const Home = ({ onPageChange }: HomeProps) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Zap,
      title: t('home.features.lowPrice.title'),
      description: t('home.features.lowPrice.description'),
      gradient: 'from-[#3F87F5] to-[#32E2C4]',
    },
    {
      icon: Shield,
      title: t('home.features.speed.title'),
      description: t('home.features.speed.description'),
      gradient: 'from-[#32E2C4] to-[#50FA7B]',
    },
    {
      icon: Eye,
      title: t('home.features.transparency.title'),
      description: t('home.features.transparency.description'),
      gradient: 'from-[#50FA7B] to-[#3F87F5]',
    },
  ];

  const flowSteps = [
    t('flow.steps.step1.title'),
    t('flow.steps.step2.title'),
    t('flow.steps.step3.title'),
    t('flow.steps.step4.title'),
    t('flow.steps.step5.title'),
    t('flow.steps.step6.title'),
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3F87F5]/10 via-transparent to-[#32E2C4]/10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#3F87F5]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#32E2C4]/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#3F87F5] via-[#32E2C4] to-[#50FA7B] bg-clip-text text-transparent">
                {t('home.title')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-[#32E2C4] font-semibold mb-4">
              {t('home.slogan')}
            </p>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('quote')}
                className="px-8 py-4 bg-[#50FA7B] text-black font-bold text-lg rounded-xl hover:bg-[#50FA7B]/90 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>{t('home.hero.cta')}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('contact')}
                className="px-8 py-4 border-2 border-[#3F87F5] text-[#3F87F5] font-bold text-lg rounded-xl hover:bg-[#3F87F5] hover:text-white transition-colors duration-200"
              >
                {t('home.hero.contact')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('home.features.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-xl" 
                     style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Summary Section */}
      <WorksSummary onPageChange={onPageChange} />

      {/* Pricing Section */}
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
              {t('home.pricing.title')}
            </h2>
            <p className="text-xl text-gray-300">{t('home.pricing.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#3F87F5]/10 to-[#32E2C4]/10 border border-[#3F87F5]/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">{t('home.pricing.brandSite.title')}</h3>
              <p className="text-gray-300 mb-6">{t('home.pricing.brandSite.description')}</p>
              <div className="space-y-2">
                <p className="text-gray-400 line-through">{t('home.pricing.brandSite.marketPrice')}</p>
                <p className="text-2xl font-bold text-[#50FA7B]">{t('home.pricing.brandSite.ourPrice')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#50FA7B]/10 to-[#32E2C4]/10 border border-[#50FA7B]/30 rounded-2xl p-8"
            >
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-[#50FA7B] mr-2" />
                <h3 className="text-2xl font-bold text-white">{t('home.pricing.campaign.title')}</h3>
              </div>
              <p className="text-gray-300 text-lg">{t('home.pricing.campaign.description')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
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
              {t('home.flow.title')}
            </h2>
            <p className="text-xl text-gray-300">{t('home.flow.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#3F87F5] to-[#32E2C4] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-300 font-medium">{step}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => onPageChange('flow')}
              className="px-8 py-3 border-2 border-[#32E2C4] text-[#32E2C4] font-semibold rounded-xl hover:bg-[#32E2C4] hover:text-black transition-colors duration-200"
            >
              詳細を見る
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#3F87F5]/20 via-[#32E2C4]/20 to-[#50FA7B]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('home.cta.subtitle')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange('quote')}
              className="px-12 py-4 bg-[#50FA7B] text-black font-bold text-xl rounded-xl hover:bg-[#50FA7B]/90 transition-colors duration-200 mb-4"
            >
              {t('home.cta.button')}
            </motion.button>
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <CheckCircle className="w-5 h-5 text-[#50FA7B]" />
              <span className="text-sm">{t('home.cta.note')}</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
