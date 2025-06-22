import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
// [修正] 会社概要セクションで使用するアイコンを追加
import { Target, Zap, Users, TrendingUp, Globe, ArrowRight, Building, MapPin, Phone, Mail } from 'lucide-react';
// [追加] 作成した地図コンポーネントをインポート
import { MapComponent } from '../components/Map';


interface AboutProps {
  onPageChange: (page: string) => void;
}

export const About = ({ onPageChange }: AboutProps) => {
  const { t } = useTranslation();
  // [追加] Google Maps APIキーを環境変数から取得
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const values = [
    {
      icon: Target,
      title: t('about.values.resultOriented.title'),
      description: t('about.values.resultOriented.description'),
      gradient: 'from-[#3F87F5] to-[#32E2C4]',
    },
    {
      icon: Zap,
      title: t('about.values.aiUtilization.title'),
      description: t('about.values.aiUtilization.description'),
      gradient: 'from-[#32E2C4] to-[#50FA7B]',
    },
    {
      icon: TrendingUp,
      title: t('about.values.phaseSupport.title'),
      description: t('about.values.phaseSupport.description'),
      gradient: 'from-[#50FA7B] to-[#3F87F5]',
    },
  ];

  const targetCustomers = [
    t('about.target.items.0'),
    t('about.target.items.1'),
    t('about.target.items.2'),
    t('about.target.items.3'),
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#3F87F5]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#50FA7B]/20 rounded-full filter blur-3xl" />
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
                {t('about.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Positioning Section */}
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
              {t('about.positioning.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#3F87F5]/10 to-[#32E2C4]/10 border border-[#3F87F5]/30 rounded-2xl p-8 md:p-12"
          >
            <div className="flex items-center mb-8">
              <Globe className="w-10 h-10 text-[#32E2C4] mr-4" />
              <h3 className="text-3xl font-bold text-white">MiniMaxCode</h3>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {t('about.positioning.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <h4 className="text-lg font-semibold text-[#50FA7B] mb-2">{t('about.positioning.lowCostTitle')}</h4>
                <p className="text-gray-300 text-sm">{t('about.positioning.lowCost')}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <h4 className="text-lg font-semibold text-[#32E2C4] mb-2">{t('about.positioning.highSpeedTitle')}</h4>
                <p className="text-gray-300 text-sm">{t('about.positioning.highSpeed')}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <h4 className="text-lg font-semibold text-[#3F87F5] mb-2">{t('about.positioning.qualityAssuredTitle')}</h4>
                <p className="text-gray-300 text-sm">{t('about.positioning.qualityAssured')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              {t('about.values.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
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
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Customers Section */}
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
              {t('about.target.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {targetCustomers.map((customer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#32E2C4] to-[#50FA7B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{customer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-[#3F87F5]/10 via-[#32E2C4]/10 to-[#50FA7B]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              {t('about.mission.title')}
            </h2>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12">
              <p className="text-2xl text-[#32E2C4] font-semibold mb-6">
                {t('about.mission.quote')}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {t('about.mission.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-[#50FA7B] mb-2">50%</p>
                  <p className="text-gray-300">{t('about.mission.costReduction')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#32E2C4] mb-2">2-Day</p>
                  <p className="text-gray-300">{t('about.mission.fastestDelivery')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#3F87F5] mb-2">100%</p>
                  <p className="text-gray-300">{t('about.mission.transparentAccounting')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Outline & Access Section */}
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
              {t('about.outline.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Company Outline */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <Building className="w-6 h-6 text-[#3F87F5] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">{t('about.outline.name')}</p>
                    <p className="text-lg text-white font-semibold">{t('about.outline.nameValue')}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#32E2C4] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">{t('about.outline.location')}</p>
                    <p className="text-lg text-white font-semibold">{t('about.outline.locationValue')}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#50FA7B] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">{t('about.outline.contact')}</p>
                    <p className="text-lg text-white font-semibold">{t('about.outline.contactValue')}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#FBBF24] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">{t('about.outline.phone')}</p>
                    <p className="text-lg text-white font-semibold">{t('about.outline.phoneValue')}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-96 bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden"
            >
              {apiKey ? (
                <MapComponent apiKey={apiKey} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Google Maps API Key is missing.</p>
                </div>
              )}
            </motion.div>
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              {t('about.cta.title')}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange('works')}
              className="px-8 py-4 bg-gradient-to-r from-[#32E2C4] to-[#50FA7B] text-black font-bold text-lg rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 mx-auto"
            >
              <span>{t('about.cta.button')}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};