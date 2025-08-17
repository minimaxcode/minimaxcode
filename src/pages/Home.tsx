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
        title: t('home.features.lowPrice.competitors.title'),
        price: '¥300,000～500,000',
      },
      ourService: {
        title: t('home.features.lowPrice.ourService.title'),
        price: t('home.features.lowPrice.ourService.price'),
        highlight: t('home.features.lowPrice.ourService.highlight')
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
        title: t('home.features.speed.competitors.title'),
        price: t('home.features.speed.competitors.duration'),
        subtitle: t('home.features.speed.competitors.period')
      },
      ourService: {
        title: t('home.features.speed.ourService.title'),
        price: t('home.features.speed.ourService.duration'),
        subtitle: t('home.features.speed.competitors.period'),
        highlight: t('home.features.speed.ourService.highlight')
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
        title: t('home.features.transparency.competitors.title'),
        price: t('home.features.transparency.competitors.status'),
        subtitle: t('home.features.transparency.competitors.note')
      },
      ourService: {
        title: t('home.features.transparency.ourService.title'),
        price: t('home.features.transparency.ourService.status'),
        subtitle: '料金体系',
        highlight: t('home.features.transparency.ourService.highlight')
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
      <section className="relative bg-transparent pt-[var(--header-h)] md:pt-0 md:-mt-[var(--header-h)]">
        <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-auto md:aspect-[5/2] lg:aspect-[21/9] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src="/images/home-hero.jpg" alt="Home Hero" className="w-full h-full object-contain md:object-cover object-center" />
          </motion.div>

          {/* 文案与按钮覆盖层（左半部分） */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden md:flex md:absolute md:inset-0 items-start justify-start"
            style={{ zIndex: 10 }}
          >
            {/* 桌面端覆盖层 */}
            <div className="w-full md:pl-[6vw] md:pr-[4vw] pt-6 md:pt-10 lg:pt-16">
              <div className="w-full md:w-1/2 lg:w-1/2 text-left md:pt-[calc(var(--header-h)+80px)] lg:pt-[calc(var(--header-h)+180px)] max-w-[80%] overflow-hidden">
                <h1 className="text-6xl lg:text-8xl font-extrabold text-[#2F4766] mb-4">
                  {t('home.title')}
                </h1>
                <h2 className="text-4xl text-[#0EA5FF] mb-12">
                  {t('home.hero.subtitle')}
                </h2>
                <p className="text-xl lg:text-2xl text-[#2F4766]/95 leading-relaxed mb-16 max-w-[52rem] break-words">
                  {t('home.hero.description')}
                </p>
                <div className="flex flex-row gap-6 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onPageChange('quote')}
                    className="px-12 py-6 rounded-xl bg-gradient-to-r from-[#33C6FF] to-[#0EA5FF] text-white font-semibold text-2xl shadow-lg hover:opacity-90"
                  >
                    {t('home.hero.cta')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onPageChange('contact')}
                    className="px-12 py-6 rounded-xl bg-gradient-to-r from-[#0EA5FF] to-[#6A7DFF] text-white font-semibold text-2xl shadow-lg hover:opacity-90"
                  >
                    {t('home.hero.contact')}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* 移动端独立文案块（不覆盖图片，避免重叠） */}
        <div className="md:hidden px-4 pt-4 pb-8">
          <h1 className="text-3xl font-extrabold text-[#2F4766] mb-3">
            {t('home.title')}
          </h1>
          <h2 className="text-xl text-[#0EA5FF] mb-4">
            {t('home.hero.subtitle')}
          </h2>
          <p className="text-base text-[#2F4766]/95 leading-relaxed mb-6">
            {t('home.hero.description')}
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onPageChange('quote')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#33C6FF] to-[#0EA5FF] text-white font-semibold text-base"
            >
              {t('home.hero.cta')}
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0EA5FF] to-[#6A7DFF] text-white font-semibold text-base"
            >
              {t('home.hero.contact')}
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0EA5FF]">
              {t('home.whyChooseUs.title')}
            </h2>
            <p className="text-xl font-medium text-[#0EA5FF] mb-8">{t('home.whyChooseUs.subtitle')}</p>
          </motion.div>

          <div className="relative">
            {/* 图片背景层 - 绝对定位在文字后方，有序分布 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute top-8 -right-6 lg:-right-12 w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <img src="/images/concern-1.png" alt="illustration 1" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute top-80 -left-6 lg:-left-12 w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <img src="/images/concern-2.png" alt="illustration 2" className="w-full h-full object-cover" />
            </motion.div>

            {/* 文字内容层 - 位于图片上方 */}
            <div className="relative space-y-12" style={{ zIndex: 10 }}>
              {[
                t('home.whyChooseUs.item1'),
                t('home.whyChooseUs.item2'),
                t('home.whyChooseUs.item3'),
                t('home.whyChooseUs.item4'),
                t('home.whyChooseUs.item5')
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`max-w-4xl mx-auto px-4 ${
                    index === 0 ? 'text-right pr-8 lg:pr-20' :
                    index === 1 ? 'text-left pl-8 lg:pl-20' :
                    index === 2 ? 'text-right pr-8 lg:pr-20' :
                    index === 3 ? 'text-left pl-8 lg:pl-20' :
                    'text-right pr-8 lg:pr-20'
                  }`}
                >
                  <div className={`inline-block ${
                    index % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                  } rounded-2xl px-4 py-3 md:px-8 md:py-6 shadow-md border border-blue-100`}>
                    <p className="text-base md:text-xl text-gray-800 font-medium leading-relaxed whitespace-normal md:whitespace-nowrap break-words">
                      {item}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">
              <span className="text-[#0EA5FF]">
                {t('home.features.sectionTitle')}
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                title: t('home.features.costEffective.title'),
                description: t('home.features.costEffective.description'),
                bgColor: 'bg-orange-100',
                borderColor: 'border-orange-200',
                image: '/images/reason-1.png' // AI技術でコストパフォーマンス
              },
              {
                title: t('home.features.timeSaving.title'),
                description: t('home.features.timeSaving.description'),
                bgColor: 'bg-green-100',
                borderColor: 'border-green-200',
                image: '/images/reason-2.png' // コアビジネスに集中
              },
              {
                title: t('home.features.customization.title'),
                description: t('home.features.customization.description'),
                bgColor: 'bg-purple-100',
                borderColor: 'border-purple-200',
                image: '/images/reason-3.png' // カスタマイズデザイン
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl p-10 transition-all duration-300 min-w-0`}
              >
                <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-[#2F4766] mb-4 text-center leading-tight">
                  {feature.title}
                </h3>
                <div className="mb-6 w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed text-left">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onPageChange('quote')}
              className="inline-flex items-center px-8 py-4 border border-[#0EA5FF] text-[#0EA5FF] font-semibold text-lg rounded-xl hover:bg-[#0EA5FF] hover:text-white transition-all duration-200"
            >
              {t('home.features.getStarted')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* MiniMaxCode Strengths Section */}
      <section className="py-20 bg-transparent">
        <div className="w-[90%] max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">
              <span className="text-[#0EA5FF]">
                {t('home.strengths.title')}
              </span>
            </h2>
          </motion.div>

          <div className="space-y-16">
            {[
              { title: t('home.strengths.item1.title'), description: t('home.strengths.item1.description') },
              { title: t('home.strengths.item2.title'), description: t('home.strengths.item2.description') },
              { title: t('home.strengths.item3.title'), description: t('home.strengths.item3.description') },
              { title: t('home.strengths.item4.title'), description: t('home.strengths.item4.description') },
              { title: t('home.strengths.item5.title'), description: t('home.strengths.item5.description') },
              { title: t('home.strengths.item6.title'), description: t('home.strengths.item6.description') },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-10 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* 文本区 */}
                <div className="lg:w-1/2">
                  <h3 className="text-xl md:text-2xl font-bold text-[#2F4766] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <button
                    onClick={() => onPageChange('quote')}
                    className="inline-flex items-center text-[#0EA5FF] font-semibold hover:underline text-xl"
                  >
                    {t('home.features.getStarted')}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                {/* 预留图片位置 */}
                <div className="lg:w-1/2">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white p-6 lg:p-8">
                    <img src={`/images/strength-${index + 1}.png`} alt={`Strength ${index + 1}`} className="w-full h-full object-contain" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Works Summary Section */}
      <WorksSummary onPageChange={onPageChange} />

      {/* Flow Section */}
      <section id="flow" className="py-20 bg-transparent">
        <div className="w-[92%] max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">
              <span className="text-[#0EA5FF]">
                {t('flow.hero.title')}
              </span>
            </h2>
            {/* 删除副标题 */}
          </motion.div>

          <div className="max-w-[61.6rem] mx-auto">
            <div className="space-y-14">
              {[
                { title: t('flow.steps.step1.title'), description: t('flow.steps.step1.description'), image: '/images/flow-1.png' },
                { title: t('flow.steps.step2.title'), description: t('flow.steps.step2.description'), image: '/images/flow-2.png' },
                { title: t('flow.steps.step3.title'), description: t('flow.steps.step3.description'), image: '/images/flow-3.png' },
                { title: t('flow.steps.step4.title'), description: t('flow.steps.step4.description'), image: '/images/flow-4.png' },
                { title: t('flow.steps.step5.title'), description: t('flow.steps.step5.description'), image: '/images/flow-5.png' },
                { title: t('flow.steps.step6.title'), description: t('flow.steps.step6.description'), image: '/images/flow-6.png' },
                { title: t('flow.steps.step7.title'), description: t('flow.steps.step7.description'), image: '/images/flow-7.png' },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6"
                >
                  {/* 左侧：步骤图标/图片 */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center overflow-hidden bg-transparent">
                    {step.image ? (
                      <img src={step.image} alt={`Step ${idx + 1}`} className="w-full h-full object-contain p-3" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">制作中</div>
                    )}
                  </div>

                  {/* 右侧：文案 */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-xl font-bold text-[#2F4766] mb-2">{step.title}</h3>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-wrap">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
