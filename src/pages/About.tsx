import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
// [修正] 会社概要セクションで使用するアイコンを追加
import { Target, Zap, Users, TrendingUp, Globe, ArrowRight, Building, MapPin, Phone, Mail, Clock } from 'lucide-react';
// [追加] 作成した地図コンポーネントをインポート
import { MapComponent } from '../components/Map';


interface AboutProps {
  onPageChange: (page: string) => void;
}

export const About = ({ onPageChange }: AboutProps) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Target,
      title: t('about.values.resultOriented.title'),
      description: t('about.values.resultOriented.description'),
      color: 'teal-600',
      bgColor: 'teal-100',
    },
    {
      icon: Zap,
      title: t('about.values.aiUtilization.title'),
      description: t('about.values.aiUtilization.description'),
      color: 'emerald-600',
      bgColor: 'emerald-100',
    },
    {
      icon: TrendingUp,
      title: t('about.values.phaseSupport.title'),
      description: t('about.values.phaseSupport.description'),
      color: 'violet-600',
      bgColor: 'violet-100',
    },
  ];

  const targetCustomers = [
    t('about.target.items.0'),
    t('about.target.items.1'),
    t('about.target.items.2'),
    t('about.target.items.3'),
  ];

  return (
    <div className="min-h-screen bg-[#F6FAFF] text-gray-900 pt-24">
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#2F4766]">{t('about.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">{t('about.values.title')}</h2>
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
                <div className="rounded-xl p-8 hover:shadow-2xl transition-all duration-300 h-full group border border-gray-200" style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`} style={{
                    background: `linear-gradient(135deg, ${value.bgColor} 0%, ${value.bgColor.replace('100', '200')} 100%)`
                  }}>
                    <value.icon className={`w-8 h-8 text-${value.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Outline & Access Section - 移动到ミッション部分下方 */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F4766]">{t('about.outline.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Company Outline */}
            <div 
              className="rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(240, 249, 255, 0.95) 0%, rgba(224, 242, 254, 0.95) 50%, rgba(236, 254, 255, 0.95) 100%)',
                border: '2px solid #60a5fa',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#14b8a6';
                e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#60a5fa';
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
              }}
            >
              {/* 装饰性元素 */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '20px',
                height: '20px',
                background: 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)',
                borderRadius: '50%',
                opacity: '0.6'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                width: '16px',
                height: '16px',
                background: 'linear-gradient(135deg, #60a5fa 0%, #14b8a6 100%)',
                borderRadius: '50%',
                opacity: '0.4'
              }} />
              
              <ul className="space-y-8 relative z-10">
                <li className="flex items-start space-x-6">
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #60a5fa 0%, #14b8a6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 40px rgba(96, 165, 250, 0.5)'
                  }}>
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">{t('about.outline.name')}</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('about.outline.nameValue')}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #60a5fa 0%, #14b8a6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 40px rgba(96, 165, 250, 0.5)'
                  }}>
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">{t('about.outline.location')}</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('about.outline.locationValue')}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #60a5fa 0%, #14b8a6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 40px rgba(96, 165, 250, 0.5)'
                  }}>
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">{t('about.outline.contact')}</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('about.outline.contactValue')}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #60a5fa 0%, #14b8a6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 40px rgba(96, 165, 250, 0.5)'
                  }}>
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">{t('about.outline.phone')}</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('about.outline.phoneValue')}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #60a5fa 0%, #14b8a6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 40px rgba(96, 165, 250, 0.5)'
                  }}>
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">{t('about.outline.businessHours')}</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('about.outline.businessHoursValue')}</p>
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
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl aspect-square"
            >
              <MapComponent />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};