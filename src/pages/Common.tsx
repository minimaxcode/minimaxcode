import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, CreditCard, ArrowRight, Smartphone, Globe, Boxes, Users, Package, BarChart3, Search, Shield, Mail } from 'lucide-react';

interface CommonProps {
  onPageChange: (page: string) => void;
}

export const Common = ({ onPageChange }: CommonProps) => {
  const { t } = useTranslation();

  const sections = [
    {
      key: 'booking',
      icon: Calendar,
      title: t('common.features.booking.title'),
      description: t('common.features.booking.description'),
      benefits: [
        t('common.features.booking.benefits.realtime'),
        t('common.features.booking.benefits.automated'),
        t('common.features.booking.benefits.flexible'),
        t('common.features.booking.benefits.integration'),
      ],
      // 左侧图形背景色
      bg: 'from-blue-100 to-cyan-50'
    },
          {
      key: 'payment',
      icon: CreditCard,
      title: t('common.features.payment.title'),
      description: t('common.features.payment.description'),
      benefits: [
        t('common.features.payment.benefits.cart'),
        t('common.features.payment.benefits.payment'),
        t('common.features.payment.benefits.product'),
      ],
      bg: 'from-emerald-100 to-teal-50'
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6FAFF] text-gray-900 pt-24">
      {/* 标题（保留） */}
      <section className="pt-16 pb-10 bg-transparent">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">{t('common.hero.title')}</h1>
            <p className="text-lg text-gray-600 max-w-5xl mx-auto">{t('common.hero.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* 主体两行模块：予約システム / ECシステム */}
      <section className="py-8 md:py-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {sections.map((s, idx) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* 根据索引决定内容顺序 */}
              {idx % 2 === 0 ? (
                <>
                  {/* 左侧：文字说明 */}
                  <div className="w-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <s.icon className="w-8 h-8 text-[#0EA5FF]" />
                      <h2 className="text-3xl md:text-4xl font-bold text-[#2F4766]">{s.title}</h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">{s.description}</p>
                    <ul className="space-y-3 mb-6">
                      {s.benefits.map((b, i) => (
                        <li key={i} className="flex items-start space-x-3 text-base">
                          <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 右侧：预留图片/装饰图形 */}
                  <div className="w-full">
                    <div className="relative w-full h-64 sm:h-80 lg:h-[420px]">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${s.bg}`} />
                      <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/60" />
                      <div className="absolute bottom-8 right-8 w-16 h-16 rounded-2xl bg-white/50" />
                      <img
                        src={s.key === 'booking' ? '/images/common/booking-hero.png' : '/images/common/ecommerce-hero.png'}
                        alt={`${s.title}`}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* 左侧：预留图片/装饰图形 */}
                  <div className="w-full">
                    <div className="relative w-full h-64 sm:h-80 lg:h-[420px]">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${s.bg}`} />
                      <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/60" />
                      <div className="absolute bottom-8 right-8 w-16 h-16 rounded-2xl bg-white/50" />
                      <img
                        src={s.key === 'booking' ? '/images/common/booking-hero.png' : '/images/common/ecommerce-hero.png'}
                        alt={`${s.title}`}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* 右侧：文字说明 */}
                  <div className="w-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <s.icon className="w-8 h-8 text-[#0EA5FF]" />
                      <h2 className="text-3xl md:text-4xl font-bold text-[#2F4766]">{s.title}</h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">{s.description}</p>
                    <ul className="space-y-3 mb-6">
                      {s.benefits.map((b, i) => (
                        <li key={i} className="flex items-start space-x-3 text-base">
                          <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                          <span className="text-gray-700">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* EC関連機能カード（新規コンテナ） */}
      <section className="py-6 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { iconBg: 'bg-blue-50 text-blue-600', title: t('common.systemFeatures.mobileOptimization.title'), desc: t('common.systemFeatures.mobileOptimization.description'), icon: Smartphone },
              { iconBg: 'bg-emerald-50 text-emerald-600', title: t('common.systemFeatures.smartForm.title'), desc: t('common.systemFeatures.smartForm.description'), icon: Users },
              { iconBg: 'bg-indigo-50 text-indigo-600', title: t('common.systemFeatures.meo.title'), desc: t('common.systemFeatures.meo.description'), icon: Globe },
              { iconBg: 'bg-pink-50 text-pink-600', title: t('common.systemFeatures.snsIntegration.title'), desc: t('common.systemFeatures.snsIntegration.description'), icon: Boxes },
              { iconBg: 'bg-rose-50 text-rose-600', title: t('common.systemFeatures.seo.title'), desc: t('common.systemFeatures.seo.description'), icon: Search },
              { iconBg: 'bg-teal-50 text-teal-600', title: t('common.systemFeatures.sslDomain.title'), desc: t('common.systemFeatures.sslDomain.description'), icon: Shield },
              { iconBg: 'bg-purple-50 text-purple-600', title: t('common.systemFeatures.analytics.title'), desc: t('common.systemFeatures.analytics.description'), icon: BarChart3 },
              { iconBg: 'bg-orange-50 text-orange-600', title: t('common.systemFeatures.blog.title'), desc: t('common.systemFeatures.blog.description'), icon: Boxes },
              { iconBg: 'bg-cyan-50 text-cyan-600', title: t('common.systemFeatures.emailNews.title'), desc: t('common.systemFeatures.emailNews.description'), icon: Mail },
              { iconBg: 'bg-fuchsia-50 text-fuchsia-600', title: t('common.systemFeatures.searchConsole.title'), desc: t('common.systemFeatures.searchConsole.description'), icon: Globe },
              { iconBg: 'bg-lime-50 text-lime-600', title: t('common.systemFeatures.multilingual.title'), desc: t('common.systemFeatures.multilingual.description'), icon: Globe },
              { iconBg: 'bg-slate-50 text-slate-600', title: t('common.systemFeatures.externalIntegration.title'), desc: t('common.systemFeatures.externalIntegration.description'), icon: Package },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-[0_6px_24px_rgba(2,132,199,0.08)] border border-gray-100">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${item.iconBg}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#2F4766] leading-snug mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section（保留） */}
      <section className="py-12 md:py-16 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F4766] mb-4">
                {t('common.cta.title')}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                {t('common.cta.description')}
              </p>

              <button
                onClick={() => onPageChange('quote')}
                className="inline-flex items-center px-8 py-4 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('common.cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <p className="text-sm text-gray-500 mt-4">
                {t('common.cta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 