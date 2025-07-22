import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Zap, Shield, Eye, ArrowRight, Star, CheckCircle, Code } from 'lucide-react';
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
      color: 'teal',
      competitors: {
        title: '一般的な制作会社',
        price: '¥300,000～500,000',
      },
      ourService: {
        title: 'MiniMaxCode',
        price: '¥30,000～150,000',
        highlight: '業界最安値！追加費用なし'
      },
      services: [
        'レスポンシブデザイン',
        'SEO基本設定',
        'お問い合わせフォーム',
        '無料サポート30日間'
      ]
    },
    {
      icon: Shield,
      title: t('home.features.speed.title'),
      description: t('home.features.speed.description'),
      color: 'orange',
      competitors: {
        title: '一般的な制作会社',
        price: '30～60営業日',
        subtitle: '制作期間'
      },
      ourService: {
        title: 'MiniMaxCode',
        price: '7～20営業日',
        subtitle: '制作期間',
        highlight: '相談後、最短2日で納品可能'
      },
      services: [
        'AI活用による効率化',
        '並行作業による短縮',
        'テンプレート活用',
        '迅速な修正対応'
      ]
    },
    {
      icon: Eye,
      title: t('home.features.transparency.title'),
      description: t('home.features.transparency.description'),
      color: 'violet',
      competitors: {
        title: '一般的な制作会社',
        price: '不明朗',
        subtitle: '追加費用ある場合多い'
      },
      ourService: {
        title: 'MiniMaxCode',
        price: '明朗会計',
        subtitle: '料金体系',
        highlight: '事前見積もり・追加費用なし'
      },
      services: [
        '詳細な見積書提供',
        '進捗状況リアルタイム共有',
        '修正回数制限なし',
        '完全固定料金制'
      ]
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3F87F5]/20 via-[#32E2C4]/20 to-[#50FA7B]/20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-gray-100/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900">
              {t('home.title')}
            </h1>
            <p className="text-3xl md:text-4xl text-teal-600 font-semibold mb-4">
              {t('home.slogan')}
            </p>
            <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-xl text-gray-500 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPageChange('quote')}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-lg rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>{t('home.hero.cta')}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPageChange('contact')}
                className="px-8 py-4 border-2 border-violet-400 text-violet-600 font-semibold text-lg rounded-lg hover:bg-violet-50 hover:border-violet-500 transition-colors duration-200"
              >
                {t('home.hero.contact')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('home.features.sectionTitle')}
            </h2>
          </motion.div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Feature Header */}
                <div className="flex items-center mb-8">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mr-6 ${
                    feature.color === 'teal' ? 'bg-teal-100' :
                    feature.color === 'emerald' ? 'bg-emerald-100' :
                    feature.color === 'violet' ? 'bg-violet-100' :
                    'bg-orange-100'
                  }`}>
                    <feature.icon className={`w-8 h-8 ${
                      feature.color === 'teal' ? 'text-teal-600' :
                      feature.color === 'emerald' ? 'text-emerald-600' :
                      feature.color === 'violet' ? 'text-violet-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
                {/* Comparison Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Competitors */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">{feature.competitors.title}</h4>
                    {feature.title === t('home.features.lowPrice.title') ? (
                      <>
                        <ul className="mb-4 space-y-2 text-center">
                          <li className="flex justify-between items-center w-full max-w-xs mx-auto">
                            <span className="font-medium text-gray-600">コーディング費用</span>
                            <span className="font-bold text-gray-600 whitespace-nowrap">¥50,000~</span>
                          </li>
                          <li className="flex justify-between items-center w-full max-w-xs mx-auto">
                            <span className="font-medium text-gray-600">デザイン費用</span>
                            <span className="font-bold text-gray-600 whitespace-nowrap">¥50,000~</span>
                          </li>
                          <li className="flex justify-between items-center w-full max-w-xs mx-auto">
                            <span className="font-medium text-gray-600">ディレクション費用</span>
                            <span className="font-bold text-gray-600 whitespace-nowrap">¥50,000~</span>
                          </li>
                        </ul>
                        <div className="text-center mt-2">
                          <span className="text-2xl font-bold text-gray-600">合计¥150,000~</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-gray-600 mb-1">{feature.competitors.price}</div>
                        {feature.competitors.subtitle && (
                          <div className="text-sm text-gray-500">{feature.competitors.subtitle}</div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Our Service */}
                  <div className={`rounded-lg p-6 relative border-2 ${
                    feature.color === 'teal' ? 'bg-teal-50 border-teal-200' :
                    feature.color === 'emerald' ? 'bg-emerald-50 border-emerald-200' :
                    feature.color === 'violet' ? 'bg-violet-50 border-violet-200' :
                    'bg-orange-50 border-orange-200'
                  }`}>
                    <div className="absolute -top-3 left-4">
                      <span className={`text-white px-3 py-1 rounded-full text-sm font-medium ${
                        feature.color === 'teal' ? 'bg-teal-600' :
                        feature.color === 'emerald' ? 'bg-emerald-600' :
                        feature.color === 'violet' ? 'bg-violet-600' :
                        'bg-orange-600'
                      }`}>
                        MiniMaxCode
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-2">{feature.ourService.title}</h4>
                    <div className="text-center mb-4">
                      {feature.title === t('home.features.lowPrice.title') ? (
                        <div className="text-4xl font-bold mb-1 text-teal-600">¥30,000～</div>
                      ) : (
                        <div className={`text-2xl font-bold mb-1 ${
                          feature.color === 'teal' ? 'text-teal-600' :
                          feature.color === 'emerald' ? 'text-emerald-600' :
                          feature.color === 'violet' ? 'text-violet-600' :
                          'text-orange-600'
                        }`}>{feature.ourService.price}</div>
                      )}
                      <div className={`text-base font-medium mt-2 ${
                        feature.color === 'teal' ? 'text-teal-700' :
                        feature.color === 'emerald' ? 'text-emerald-700' :
                        feature.color === 'violet' ? 'text-violet-700' :
                        'text-orange-700'
                      }`}>{feature.ourService.highlight}</div>
                    </div>
                  </div>
                </div>
                {/* Services List */}
                {/* 已删除“サービス内容”部分 */}
                {/* CTA Button */}
                {/* 已删除“相談する”按钮 */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Summary Section */}
      <WorksSummary onPageChange={onPageChange} />

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('home.pricing.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('home.pricing.subtitle')}</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Basic Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-violet-50 to-orange-50 border border-violet-200 rounded-xl p-8 hover:shadow-md transition-shadow duration-300"
            >
              {t('service.included.basic.title') && (
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-violet-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">{t('service.included.basic.title')}</h3>
              </div>
              )}
              <ul className="space-y-4">
                {[
                  t('service.included.basic.items.0'),
                  t('service.included.basic.items.1'),
                  t('service.included.basic.items.2'),
                  t('service.included.basic.items.3'),
                  t('service.included.basic.items.4'),
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flow Section */}
      {/* 已删除制作フロー相关内容 */}
      {/* CTA Section */}
      {/* 已删除"プロジェクトを始めませんか？"部分 */}
    </div>
  );
};
