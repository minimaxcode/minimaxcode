import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Zap, CheckCircle, X, Clock, DollarSign, Shield } from 'lucide-react';

interface ServiceProps {
  onPageChange: (page: string) => void;
}

export const Service = ({ onPageChange }: ServiceProps) => {
  const { t } = useTranslation();

  const serviceTypes = [
    {
      icon: Globe,
      title: t('service.types.corporate.title'),
      description: t('service.types.corporate.description'),
      gradient: 'from-[#3F87F5] to-[#32E2C4]',
    },
    {
      icon: Zap,
      title: t('service.types.landing.title'),
      description: t('service.types.landing.description'),
      gradient: 'from-[#32E2C4] to-[#50FA7B]',
    },
  ];

  const basicItems = [
    t('service.included.basic.items.0'),
    t('service.included.basic.items.1'),
    t('service.included.basic.items.2'),
    t('service.included.basic.items.3'),
    t('service.included.basic.items.4'),
  ];

  const premiumItems = [
    t('service.included.premium.items.0'),
    t('service.included.premium.items.1'),
    t('service.included.premium.items.2'),
  ];

  const policyItems = [
    { label: t('service.policy.minAmount'), icon: DollarSign, color: '[#50FA7B]' },
    { label: t('service.policy.scope'), icon: CheckCircle, color: '[#32E2C4]' },
    { label: t('service.policy.nonScope'), icon: X, color: '[#FF6B6B]' },
    { label: t('service.policy.timeline'), icon: Clock, color: '[#3F87F5]' },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#3F87F5]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#32E2C4]/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#3F87F5] via-[#32E2C4] to-[#50FA7B] bg-clip-text text-transparent">
                {t('service.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('service.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Types Section */}
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
              {t('service.types.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceTypes.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-xl" />
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included Services Section */}
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
              {t('service.included.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Package */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#3F87F5]/10 to-[#32E2C4]/10 border border-[#3F87F5]/30 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-[#3F87F5] mr-3" />
                <h3 className="text-2xl font-bold text-white">{t('service.included.basic.title')}</h3>
              </div>
              <ul className="space-y-4">
                {basicItems.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Premium Package */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#50FA7B]/10 to-[#32E2C4]/10 border border-[#50FA7B]/30 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-[#50FA7B] mr-3" />
                <h3 className="text-2xl font-bold text-white">{t('service.included.premium.title')}</h3>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                {t('service.included.premium.plus')}
              </p>
              <ul className="space-y-4">
                {premiumItems.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Policy Section */}
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
              {t('service.policy.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 bg-${item.color}/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 text-${item.color}`} />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              {t('service.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('service.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('quote')}
                className="px-8 py-4 bg-[#50FA7B] text-black font-bold text-lg rounded-xl hover:bg-[#50FA7B]/90 transition-colors duration-200"
              >
                {t('service.cta.quote')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('pricing')}
                className="px-8 py-4 border-2 border-[#3F87F5] text-[#3F87F5] font-bold text-lg rounded-xl hover:bg-[#3F87F5] hover:text-white transition-colors duration-200"
              >
                {t('service.cta.pricing')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
