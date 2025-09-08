import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

interface PricingProps {
  onPageChange: (page: string) => void;
}

const features = [
  // Section: サイトの基本機能
  { key: 'section_basic', label: 'pricing.table.sections.basic', type: 'section' as const },
  { key: 'pages', label: 'pricing.table.features.pages' },
  { key: 'contact', label: 'pricing.table.features.contact' },
  { key: 'noAds', label: 'pricing.table.features.noAds' },
  { key: 'product', label: 'pricing.table.features.product' },
  { key: 'shop', label: 'pricing.table.features.shop' },
  { key: 'responsive', label: 'pricing.table.features.responsive' },
  { key: 'favicon', label: 'pricing.table.features.favicon' },
  { key: 'ssl', label: 'pricing.table.features.ssl' },
  // Section: マーケティングパッケージ
  { key: 'section_marketing', label: 'pricing.table.sections.marketing', type: 'section' as const },
  { key: 'seo', label: 'pricing.table.features.seo' },
  { key: 'ga4', label: 'pricing.table.features.ga4' },
  { key: 'gsc', label: 'pricing.table.features.gsc' },
  { key: 'meo', label: 'pricing.table.features.meo' },
  { key: 'content', label: 'pricing.table.features.content' },
  { key: 'price', label: 'pricing.table.features.price' },
];

export const Pricing = ({ onPageChange }: PricingProps) => {
  const { t } = useTranslation();
  const plansTableRef = useRef<HTMLTableElement | null>(null);
  const optionsTableRef = useRef<HTMLTableElement | null>(null);
  const plansWrapRef = useRef<HTMLDivElement | null>(null);
  const optionsWrapRef = useRef<HTMLDivElement | null>(null);
  const [showPlansSticky, setShowPlansSticky] = useState(false);
  const [showOptionsSticky, setShowOptionsSticky] = useState(false);
  const [plansGridCols, setPlansGridCols] = useState<string>('');
  const [optionsGridCols, setOptionsGridCols] = useState<string>('');

  useEffect(() => {
    const headerHeight = 64;
    const computeVisibility = () => {
      if (plansWrapRef.current) {
        const r = plansWrapRef.current.getBoundingClientRect();
        setShowPlansSticky(r.top <= headerHeight && r.bottom > headerHeight);
      }
      if (optionsWrapRef.current) {
        const r2 = optionsWrapRef.current.getBoundingClientRect();
        setShowOptionsSticky(r2.top <= headerHeight && r2.bottom > headerHeight);
      }
    };
    computeVisibility();
    window.addEventListener('scroll', computeVisibility, { passive: true } as any);
    window.addEventListener('resize', computeVisibility);
    return () => {
      window.removeEventListener('scroll', computeVisibility as any);
      window.removeEventListener('resize', computeVisibility);
    };
  }, []);

  // 计算各表头实际列宽，保持覆盖层与表格对齐
  useEffect(() => {
    const computeCols = () => {
      const buildTemplate = (table: HTMLTableElement | null) => {
        if (!table) return '';
        const ths = Array.from(table.querySelectorAll('thead tr th')) as HTMLTableCellElement[];
        if (!ths.length) return '';
        const widths = ths.map((th) => `${Math.round(th.getBoundingClientRect().width)}px`);
        return widths.join(' ');
      };
      setPlansGridCols(buildTemplate(plansTableRef.current));
      setOptionsGridCols(buildTemplate(optionsTableRef.current));
    };
    computeCols();
    window.addEventListener('resize', computeCols);
    return () => window.removeEventListener('resize', computeCols);
  }, []);

  const optionItems = [
    { key: 'product', name: 'pricing.options.items.product.name', price: 'pricing.options.items.product.price', description: 'pricing.options.items.product.description' },
    { key: 'news', name: 'pricing.options.items.news.name', price: 'pricing.options.items.news.price', description: 'pricing.options.items.news.description' },
    { key: 'content', name: 'pricing.options.items.content.name', price: 'pricing.options.items.content.price', description: 'pricing.options.items.content.description' },
    { key: 'contact', name: 'pricing.options.items.contact.name', price: 'pricing.options.items.contact.price', description: 'pricing.options.items.contact.description' },
    { key: 'shop', name: 'pricing.options.items.shop.name', price: 'pricing.options.items.shop.price', description: 'pricing.options.items.shop.description' },
    { key: 'blog', name: 'pricing.options.items.blog.name', price: 'pricing.options.items.blog.price', description: 'pricing.options.items.blog.description' },
    { key: 'seo', name: 'pricing.options.items.seo.name', price: 'pricing.options.items.seo.price', description: 'pricing.options.items.seo.description' },
    { key: 'meo', name: 'pricing.options.items.meo.name', price: 'pricing.options.items.meo.price', description: 'pricing.options.items.meo.description' },
    { key: 'recaptcha', name: 'pricing.options.items.recaptcha.name', price: 'pricing.options.items.recaptcha.price', description: 'pricing.options.items.recaptcha.description' },
    { key: 'ssl', name: 'pricing.options.items.ssl.name', price: 'pricing.options.items.ssl.price', description: 'pricing.options.items.ssl.description' },
    { key: 'server', name: 'pricing.options.items.server.name', price: 'pricing.options.items.server.price', description: 'pricing.options.items.server.description' },
    { key: 'domain', name: 'pricing.options.items.domain.name', price: 'pricing.options.items.domain.price', description: 'pricing.options.items.domain.description' },
    { key: 'email', name: 'pricing.options.items.email.name', price: 'pricing.options.items.email.price', description: 'pricing.options.items.email.description' },
    { key: 'update', name: 'pricing.options.items.update.name', price: 'pricing.options.items.update.price', description: 'pricing.options.items.update.description' },
    { key: 'multilingual', name: 'pricing.options.items.multilingual.name', price: 'pricing.options.items.multilingual.price', description: 'pricing.options.items.multilingual.description' },
    { key: 'sourceCode', name: 'pricing.options.items.sourceCode.name', price: 'pricing.options.items.sourceCode.price', description: 'pricing.options.items.sourceCode.description' },
    { key: 'other', name: 'pricing.options.items.other.name', price: 'pricing.options.items.other.price', description: 'pricing.options.items.other.description' },
  ];

  const plans = [
    {
      name: t('pricing.plans.basic.name'),
      tag: t('pricing.plans.basic.tag'),
      color: 'teal',
      price: { old: '40,000', current: '30,000' },
      pages: '1P~3P',
      contact: '-',
      noAds: '〇',
      product: '-',
      shop: '-',
      meo: '-',
      content: '-',
      seo: t('common.free'),
      ga4: t('common.free'),
      gsc: t('common.free'),
      favicon: t('common.free'),
      responsive: t('common.free'),
      ssl: '-',
      period: 'basic',
      feature: t('pricing.plans.basic.feature'),
    },
    {
      name: t('pricing.plans.standard.name'),
      tag: t('pricing.plans.standard.tag'),
      color: 'teal',
      price: { old: '200,000', current: '100,000/150,000' },
      pages: '~5P / ~10P',
      contact: t('common.contactLimit'),
      noAds: '〇',
      product: '〇',
      shop: '-',
      meo: '-',
      content: '-',
      seo: t('common.free'),
      ga4: t('common.free'),
      gsc: t('common.free'),
      favicon: t('common.free'),
      responsive: t('common.free'),
      ssl: '-',
      period: 'standard',
      feature: t('pricing.plans.standard.feature'),
    },
    {
      name: t('pricing.plans.customize.name'),
      tag: t('pricing.plans.customize.tag'),
      color: 'orange',
      price: { old: '250,000', current: '180,000~' },
      pages: '10P~',
      contact: t('common.contactLimit'),
      noAds: '〇',
      product: '〇',
      shop: '〇',
      meo: '-',
      content: '-',
      seo: t('common.free'),
      ga4: t('common.free'),
      gsc: t('common.free'),
      favicon: t('common.free'),
      responsive: t('common.free'),
      ssl: t('common.free'),
      period: 'customize',
      feature: t('pricing.plans.customize.feature'),
    },
    {
      name: t('pricing.plans.premium.name'),
      tag: t('pricing.plans.premium.tag'),
      color: 'indigo',
      price: { old: '373,000', current: '250,000~' },
      pages: '10P~',
      contact: t('common.contactLimit'),
      noAds: '〇',
      product: '〇',
      shop: '〇',
      meo: '〇',
      content: '〇',
      seo: t('common.free'),
      ga4: t('common.free'),
      gsc: t('common.free'),
      favicon: t('common.free'),
      responsive: t('common.free'),
      ssl: t('common.free'),
      period: 'premium',
      feature: t('pricing.plans.premium.feature'),
    },
  ];

  const featureTooltipKeyByKey: Record<string, string> = {
    seo: 'service.included.basic.descriptions.0',
    ga4: 'service.included.basic.descriptions.1',
    gsc: 'service.included.basic.descriptions.2',
    favicon: 'service.included.basic.descriptions.3',
    responsive: 'service.included.basic.descriptions.4',
    ssl: 'service.included.basic.descriptions.7',
    noAds: 'pricing.options.items.noAds.description',
    meo: 'service.included.basic.descriptions.5',
    content: 'service.included.basic.descriptions.6',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-gray-900 pt-24" style={{ background: 'linear-gradient(180deg, #F6FAFF 0%, #FFFFFF 100%)' }}>
      {/* Hero Section */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-5 text-[#2F4766]">{t('pricing.hero.title')}</h1>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('pricing.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 応援キャンペーン Section removed per request */}

      {/* WEB制作プラン料金表 */}
      <section id="plans" className="py-12 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-5 text-[#2F4766]">
              {t('pricing.table.title')}
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('pricing.table.subtitle')}
            </p>
          </motion.div>

          {/* 添加滑动提示 */}
          <div className="text-sm text-gray-500 md:hidden mb-2 text-center">
            <span>← スワイプしてご確認いただけます →</span>
          </div>

          {/* 表格容器 */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-7xl mx-0" ref={plansWrapRef}>
              <div className="overflow-x-auto hide-scrollbar">
                {/* Sticky header overlay for plans (desktop) */}
                {showPlansSticky && (
                  <div className="fixed left-1/2 -translate-x-1/2 top-16 z-30 hidden md:block w-full max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-none">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 min-w-[1200px]">
                      <div className="grid" style={{ gridTemplateColumns: plansGridCols || '15rem repeat(4, 15rem)' }}>
                        <div className="px-4 py-3 text-sm font-semibold text-gray-900 text-center whitespace-nowrap border-r border-blue-100">{t('pricing.table.item')}</div>
                        {plans.map((plan) => (
                          <div key={plan.name} className="px-4 py-3 text-sm font-semibold text-center whitespace-nowrap">
                            <div className="font-bold text-[#2F4766]">{plan.name}</div>
                            {plan.tag && (
                              <div className="inline-block mt-1 text-xs rounded-full px-2 py-0.5 bg-blue-100 text-blue-800">{plan.tag}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <table className="w-full min-w-[1200px] rounded-xl bg-transparent text-center mx-auto" ref={plansTableRef}>
                <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                  <tr>
                    <th className="left-0 z-20 px-4 py-3 text-sm font-semibold text-gray-900 text-center w-60 whitespace-nowrap border-r border-blue-100">
                      {t('pricing.table.item')}
                    </th>
                    {plans.map((plan, idx) => (
                      <th
                        key={plan.name}
                        className={`px-4 py-3 text-sm font-semibold text-center w-60 whitespace-nowrap ${idx === 2 ? 'border-l-2 border-r-2 border-t-2 border-[#0EA5FF]' : ''}`}
                      >
                        <div className="font-bold text-[#2F4766]">{plan.name}</div>
                        {plan.tag && <div className="inline-block mt-1 text-xs rounded-full px-2 py-0.5 bg-blue-100 text-blue-800">{plan.tag}</div>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-100">
                  {features.map((feature, featureIdx) => {
                    if ((feature as any).type === 'section') {
                      return (
                        <tr key={feature.key}>
                          <td className="sticky left-0 bg-transparent z-10 px-4 py-3 text-sm font-bold text-[#0EA5FF] text-left w-60 whitespace-nowrap border-r border-blue-100">
                            {t(feature.label)}
                          </td>
                          {plans.map((plan, idx) => (
                            <td key={plan.name + feature.key} className={`px-4 py-3 text-sm text-center w-60 whitespace-nowrap text-gray-600 ${idx === 2 ? 'border-l-2 border-r-2 border-[#0EA5FF]' : ''}`}>
                              {/* section spacer */}
                            </td>
                          ))}
                        </tr>
                      );
                    }
                    return (
                      <tr key={feature.key}>
                        <td className="sticky left-0 bg-transparent z-10 px-4 py-3 text-sm text-gray-700 text-left w-60 whitespace-nowrap border-r border-blue-100">
                          {(() => {
                            const tooltipKey = featureTooltipKeyByKey[(feature as any).key as string] || '';
                            const labelEl = <span className={tooltipKey ? 'cursor-help' : ''}>{t((feature as any).label)}</span>;
                            if (!tooltipKey) return labelEl;
                            return (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>{labelEl}</TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-[360px] text-sm leading-relaxed bg-white text-[#2F4766] border border-blue-200 shadow-sm">
                                    <span className="whitespace-pre-line">{t(tooltipKey)}</span>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })()}
                        </td>
                        {plans.map((plan, idx) => (
                          <td
                            key={plan.name + feature.key}
                            className={`px-4 py-3 text-sm text-center w-60 whitespace-nowrap text-gray-600 ${idx === 2 ? `border-l-2 border-r-2 border-[#0EA5FF] ${featureIdx === features.length - 1 ? 'border-b-2 border-b-[#0EA5FF]' : ''}` : ''}`}
                          >
                            {feature.key === 'price' ? (
                              <span className="block">
                                <span className="line-through text-gray-400 mr-1">{plan.price.old}</span>
                                <br />
                                <span className="text-lg font-bold text-[#0EA5FF]">¥{plan.price.current}</span>
                              </span>
                            ) : feature.key === 'seo' ? (
                              t('common.free')
                            ) : (
                              feature.key === 'period'
                                ? t(`pricing.period.${plan.period}`)
                                : (typeof plan[feature.key as keyof typeof plan] === 'string'
                                    ? (plan[feature.key as keyof typeof plan] as string)
                                    : '-')
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                 </tbody>
              </table>
            </div>
          </div>
        </div>
          <div className="text-xs text-gray-500 mt-4 text-left">
            <p>{t('pricing.notes.period')}</p>
            <p>{t('pricing.notes.requirements')}</p>
            <p>{t('pricing.notes.images', '※ ウェブサイトに掲載する画像は原則としてお客様にご提供いただきます。')}</p>
            <p>{t('pricing.notes.modifications', '※ 納品後1週間以内は無料で修正対応いたします。期間経過後、追加機能やデザイン要件には、追加料金が発生する場合があります。')}</p>
          </div>
        </div>
      </section>

      {/* Quote CTA Hook */}
      <section className="py-12 md:py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 lg:p-12">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0EA5FF] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl md:text-3xl font-bold text-[#2F4766] mb-4">
                {t('pricing.quoteCta.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed whitespace-pre-line">
                {t('pricing.quoteCta.description')}
              </p>
              
              <button
                onClick={() => onPageChange('quote')}
                className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold text-sm md:text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                {t('pricing.quoteCta.button')}
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                {t('pricing.quoteCta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* オプション料金 */}
      <section id="options" className="py-12 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-5 text-[#2F4766]">
              {t('pricing.options.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto whitespace-nowrap">
              {t('pricing.options.subtitle')}
            </p>
          </motion.div>

          {/* 添加滑动提示 */}
          <div className="text-sm text-gray-500 md:hidden mb-2 text-center">
            <span>← スワイプしてご確認いただけます →</span>
          </div>

          {/* 表格容器 */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-7xl mx-0 mt-8" ref={optionsWrapRef}>
              <div className="overflow-x-auto hide-scrollbar">
                {/* Sticky header overlay for options (desktop) */}
                {showOptionsSticky && (
                  <div className="fixed left-1/2 -translate-x-1/2 top-16 z-30 hidden md:block w-full max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-none">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 min-w-[1300px]">
                      <div className="grid" style={{ gridTemplateColumns: optionsGridCols || '360px 320px 720px' }}>
                        <div className="px-4 py-3 text-sm font-semibold text-gray-900 text-center whitespace-nowrap border-r border-blue-100">{t('pricing.options.table.item')}</div>
                        <div className="px-4 py-3 text-sm font-semibold text-gray-900 text-center whitespace-nowrap border-r border-blue-100">{t('pricing.options.table.unitPrice')}</div>
                        <div className="px-4 py-3 text-sm font-semibold text-gray-900 text-center whitespace-nowrap">{t('pricing.options.table.description')}</div>
                      </div>
                    </div>
                  </div>
                )}
                <table className="w-full min-w-[1300px] rounded-xl bg-transparent text-center mx-auto" ref={optionsTableRef}>
                <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                  <tr>
                    <th className="left-0 z-20 px-4 py-3 text-sm font-semibold text-gray-900 text-center w-[360px] whitespace-nowrap border-r border-blue-100">
                      {t('pricing.options.table.item')}
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900 text-center w-[320px] whitespace-nowrap border-r border-blue-100">
                      {t('pricing.options.table.unitPrice')}
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900 text-center w-[720px]">
                      {t('pricing.options.table.description')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-100">
                  {optionItems.map((item) => (
                    <tr key={item.key}>
                      <td className="sticky left-0 bg-transparent z-10 px-4 py-3 text-sm text-gray-700 text-left w-[360px] whitespace-nowrap border-r border-blue-100">
                        {t(item.name)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-center w-[320px] whitespace-nowrap border-r border-blue-100">
                        {['domain', 'multilingual', 'sourceCode', 'other'].includes(item.key) || /^¥/.test(t(item.price)) || t(item.price) === 'Free' || t(item.price) === '無料' || t(item.price) === '無料キャンペーン中'
                          ? (
                            <span className={item.key === 'seo' ? 'text-blue-600 font-medium' : ''}>{t(item.price)}</span>
                          )
                          : `¥${t(item.price)}`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 text-left w-[720px] leading-relaxed">
                        <div className="max-w-none" style={{lineHeight: '1.5'}}>
                          {t(item.description).includes('\n') ? (
                            <div>
                              {t(item.description).split('\n').map((line, index) => (
                                <div key={index} className={index === 0 ? '' : 'text-blue-600 font-medium mt-1'}>
                                  {line}
                                </div>
                              ))}
                            </div>
                          ) : (
                            t(item.description)
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>

        </div>
      </section>
      </div>
  );
};
