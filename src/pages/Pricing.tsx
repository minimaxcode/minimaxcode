import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface PricingProps {
  onPageChange: (page: string) => void;
}

const features = [
  { key: 'cms', label: 'pricing.table.features.cms' },
  { key: 'mobile', label: 'pricing.table.features.mobile' },
  { key: 'pages', label: 'pricing.table.features.pages' },
  { key: 'contact', label: 'pricing.table.features.contact' },
  { key: 'product', label: 'pricing.table.features.product' },
  { key: 'shop', label: 'pricing.table.features.shop' },
  { key: 'meo', label: 'pricing.table.features.meo' },
  { key: 'content', label: 'pricing.table.features.content' },
  { key: 'seo', label: 'pricing.table.features.seo' },
  { key: 'ssl', label: 'pricing.table.features.ssl' },
  { key: 'period', label: 'pricing.table.features.period' },
  { key: 'feature', label: 'pricing.table.features.feature' },
  { key: 'price', label: 'pricing.table.features.price' },
];

export const Pricing = ({ onPageChange }: PricingProps) => {
  const { t } = useTranslation();

  const optionItems = [
    { key: 'cms', name: 'pricing.options.items.cms.name', price: 'pricing.options.items.cms.price', description: 'pricing.options.items.cms.description' },
    { key: 'mobile', name: 'pricing.options.items.mobile.name', price: 'pricing.options.items.mobile.price', description: 'pricing.options.items.mobile.description' },
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
      cms: '-',
      mobile: '-',
      contact: '-',
      product: '-',
      shop: '-',
      meo: '-',
      content: '-',
      seo: t('pricing.options.items.seo.price'),
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
      cms: '〇',
      mobile: '〇',
      contact: '〇',
      product: '〇',
      shop: '-',
      meo: '-',
      content: '-',
      seo: t('pricing.options.items.seo.price'),
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
      cms: '〇',
      mobile: '〇',
      contact: '〇',
      product: '〇',
      shop: '〇',
      meo: '-',
      content: '-',
      seo: t('pricing.options.items.seo.price'),
      ssl: '無料',
      period: 'customize',
      feature: t('pricing.plans.customize.feature'),
    },
    {
      name: t('pricing.plans.premium.name'),
      tag: t('pricing.plans.premium.tag'),
      color: 'indigo',
      price: { old: '373,000', current: '250,000~' },
      pages: '10P~',
      cms: '〇',
      mobile: '〇',
      contact: '〇',
      product: '〇',
      shop: '〇',
      meo: '〇',
      content: '〇',
      seo: t('pricing.options.items.seo.price'),
      ssl: '無料',
      period: 'premium',
      feature: t('pricing.plans.premium.feature'),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3F87F5]/20 via-[#32E2C4]/20 to-[#50FA7B]/20 pt-16 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-gray-100/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              <span className="bg-gradient-to-r from-[#3F87F5] via-[#32E2C4] to-[#50FA7B] bg-clip-text text-transparent">
                {t('pricing.hero.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('pricing.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* WEB制作プラン料金表 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('pricing.table.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('pricing.table.subtitle')}
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-900 border-b border-r-2 border-gray-300 w-52 whitespace-nowrap">{t('pricing.table.item')}</th>
                  {plans.map((plan, idx) => (
                    <th
                      key={plan.name}
                      className={`px-4 py-3 text-sm font-semibold border-b w-52
                        ${idx === 1 ? ' border-l-2 border-gray-200 border-r-2 border-gray-200' : ''}
                        ${idx === 2 ? ' border-l-2 border-gray-300 border-r-2 border-gray-300' : ''}
                        ${idx > 2 ? ' border-l-2 border-gray-200' : ''}
                      `}
                    >
                      <div className={`font-bold ${idx === 0 ? 'text-blue-600' : idx === plans.length - 1 ? 'text-purple-700' : `text-${plan.color}-700`}`}>{plan.name}</div>
                      {plan.tag && <div className={`inline-block mt-1 text-xs rounded-full px-2 py-0.5 ${idx === 0 ? 'bg-blue-100 text-blue-800' : idx === plans.length - 1 ? 'bg-purple-100 text-purple-800' : `bg-${plan.color}-100 text-${plan.color}-800`}`}>{plan.tag}</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((feature) => (
                  <tr key={feature.key}>
                    <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 border-r-2 border-gray-300 w-52">{t(feature.label)}</td>
                    {plans.map((plan, idx) => (
                      <td
                        key={plan.name + feature.key}
                        className={`px-4 py-3 w-52
                          ${idx === 1 ? ' border-l-2 border-gray-200 border-r-2 border-gray-200' : ''}
                          ${idx === 2 ? ' border-l-2 border-gray-300 border-r-2 border-gray-300' : ''}
                          ${idx > 2 ? ' border-l-2 border-gray-200' : ''}
                        `}
                      >
                        {feature.key === 'price' ? (
                          <span className="block">
                            <span className="line-through text-gray-400 mr-1">{plan.price.old}</span>
                            <br />
                            <span className={`text-lg font-bold ${idx === 0 ? 'text-blue-600' : idx === plans.length - 1 ? 'text-purple-600' : `text-${plan.color}-600`}`}>¥{plan.price.current}</span>
                          </span>
                        ) : (
                          feature.key === 'period'
                            ? t(`pricing.period.${plan.period}`)
                            : (typeof plan[feature.key as keyof typeof plan] === 'string'
                                ? (plan[feature.key as keyof typeof plan] as string === '無料'
                                    ? t('pricing.options.items.seo.price')
                                    : plan[feature.key as keyof typeof plan] as string)
                                : '-')
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Production Period</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="px-4 py-3 text-sm text-gray-500 text-center">
                      {t(`pricing.period.${plan.period}`)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-4 text-left">
              <p>{t('pricing.notes.period')}</p>
              <p>{t('pricing.notes.requirements')}</p>
              <p>{t('pricing.notes.materials')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* オプション料金 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('pricing.options.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('pricing.options.subtitle')}
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-900 border-b w-80 whitespace-nowrap">{t('pricing.options.table.item')}</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-900 border-b w-[400px] border-l-2 border-gray-200">{t('pricing.options.table.unitPrice')}</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-900 border-b w-[600px] border-l-2 border-gray-200">{t('pricing.options.table.description')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {optionItems.map((item) => (
                  <tr key={item.key}>
                    <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">{t(item.name)}</td>
                    <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">
                      {['domain', 'multilingual', 'sourceCode', 'other'].includes(item.key) || /^¥/.test(t(item.price)) || t(item.price) === 'Free' || t(item.price) === '無料'
                        ? t(item.price)
                        : `¥${t(item.price)}`}
                    </td>
                    <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">{t(item.description)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-4 text-left">
              <p>{t('pricing.options.notes.period')}</p>
              <p>{t('pricing.options.notes.materials')}</p>
              <p>{t('pricing.options.notes.requirements')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
