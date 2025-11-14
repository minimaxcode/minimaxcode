import { useTranslation } from 'react-i18next';
// [MODIFIED] useStateとuseEffectをインポート
// [MODIFIED] Imported useState and useEffect
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, Phone, User, Building, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';

// [MODIFIED] onPageChangeと、新たに見積もりデータを受け取るためのquoteDetailsプロパティを定義
// [MODIFIED] Defined onPageChange and the new quoteDetails prop to receive quote data
interface ContactProps {
  onPageChange: (page: string, data?: any) => void;
  quoteDetails?: {
    quoteData?: any;
    pricing?: any;
    source?: string;
  } | null;
}

interface ContactFormData {
  industry: string;
  industryOther: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  status?: string; // 现状：サイトなし/サイトあり
  websiteUrl?: string; // 网站URL（当status为サイトあり时必填）
}

export const Contact = ({ onPageChange, quoteDetails }: ContactProps) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());
  const [faqQuery, setFaqQuery] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // [MODIFIED] react-hook-formからsetValueを取得して、プログラム的にフォームの値を設定できるようにする
    // [MODIFIED] Get setValue from react-hook-form to programmatically set form values
    setValue,
    watch,
  } = useForm<ContactFormData>({
    defaultValues: {
      industry: 'restaurant', // 默认选择餐饮业
      status: 'no-site'
    }
  });

  // 监听行业选择变化
  const watchedIndustry = watch('industry');
  const selectedStatus = watch('status');

  // 切换FAQ展开/收起状态
  const toggleFAQ = (question: string) => {
    const newOpenFAQs = new Set(openFAQs);
    if (newOpenFAQs.has(question)) {
      newOpenFAQs.delete(question);
    } else {
      newOpenFAQs.add(question);
    }
    setOpenFAQs(newOpenFAQs);
  };
  
  // [ADDED] quoteDetailsプロパティを監視し、変更があればフォームに値をセットする
  // [ADDED] Watch the quoteDetails prop and set form values if it changes
  useEffect(() => {
    if (quoteDetails && quoteDetails.source === 'quote') {
      // 見積もりデータから件名とメッセージを生成
      const subject = t('contact.quote.subject');
      
      // 見積もり詳細をメッセージに含める
      let message = t('contact.quote.message');
      
      if (quoteDetails.quoteData) {
        const { quoteData, pricing } = quoteDetails;
        
        // WEB制作プラン
        const selectedPlan = quoteData.webPlan ? 
          ['template', 'basic-5', 'basic-10', 'standard-5', 'standard-10', 'customize', 'premium']
            .find(plan => plan === quoteData.webPlan) : null;
        
        if (selectedPlan) {
          const planNames = {
            'template': t('pricing.plans.basic.name'),
            'basic-5': t('pricing.plans.basic.name') + '（5P）',
            'basic-10': t('pricing.plans.basic.name') + '（10P）',
            'standard-5': t('pricing.plans.standard.name') + '（5P）',
            'standard-10': t('pricing.plans.standard.name') + '（10P）',
            'customize': t('pricing.plans.customize.name'),
            'premium': t('pricing.plans.premium.name')
          };
          message += `${t('contact.quote.webPlan')}\n${planNames[selectedPlan]}\n`;
        }
        
        // ページ数
        message += `${t('contact.quote.pageCount')}\n${quoteData.pageCount}ページ\n\n`;
        
        // オプション
        if (quoteData.options && quoteData.options.length > 0) {
          const optionNames = {
            'cms': t('pricing.table.features.cms'),
            'mobile': t('pricing.table.features.mobile'),
            'product': t('pricing.table.features.product'),
            'news': t('pricing.table.features.news.name'),
            'content': t('pricing.table.features.content'),
            'contact': t('pricing.table.features.contact'),
            'seo': t('pricing.table.features.seo'),
            'shop': t('pricing.table.features.shop'),
            'meo': t('pricing.table.features.meo'),
            'recaptcha': t('pricing.table.features.recaptcha.name'),
            'ssl': t('pricing.table.features.ssl'),
            'blog': t('pricing.table.features.blog.name')
          };
          message += `${t('contact.quote.options')}\n${quoteData.options.map(id => optionNames[id] || id).join('\n')}\n\n`;
        }
        
                  // 保守
          if (quoteData.maintenance && quoteData.maintenance.length > 0) {
            const maintenanceNames = {
              'server': t('pricing.table.features.server.name'),
              'email': t('pricing.table.features.email.name'),
              'update': t('pricing.table.features.update.name')
            };
            message += `${t('contact.quote.maintenance')}\n${quoteData.maintenance.map(id => maintenanceNames[id] || id).join('\n')}\n\n`;
          }
        
        // 希望納期
        if (quoteData.timeline) {
          message += `${t('contact.quote.timeline')}\n${quoteData.timeline}\n\n`;
        }
        
        // ウェブサイト言語
        if (quoteData.languages && quoteData.languages.length > 0) {
          const languageNames = {
            'ja': t('quote.form.languages.japanese'),
            'en': t('quote.form.languages.english'),
            'zh': t('quote.form.languages.chinese'),
            'ko': t('quote.form.languages.korean')
          };
          message += `${t('contact.quote.languages')}\n${quoteData.languages.map(id => languageNames[id] || id).join('\n')}\n\n`;
        }
        
        // ソースコード納品
        if (quoteData.sourceCode) {
          message += `${t('contact.quote.sourceCode')}\n選択済み\n\n`;
        }
        
        // 価格情報
        if (pricing) {
          message += `${t('contact.quote.total')}\n`;
          if (pricing.hasVariableOptions) {
            message += `${t('contact.quote.websiteCost')}: ¥${pricing.websiteTotal.toLocaleString()} ~ ¥${pricing.websiteTotalMax.toLocaleString()}\n`;
          } else {
            message += `${t('contact.quote.websiteCost')}: ¥${pricing.websiteTotal.toLocaleString()}\n`;
          }
          message += `${t('contact.quote.maintenanceCost')}: ¥${pricing.maintenanceTotal.toLocaleString()}/月\n\n`;
        }
      }
      
      message += t('contact.quote.closing');
      
      setValue('subject', subject);
      setValue('message', message);
    }
  }, [quoteDetails, setValue]);

  // 触发谷歌广告转化事件
  useEffect(() => {
    if (submitStatus === 'success' && typeof window !== 'undefined') {
      const gtag = (window as typeof window & { gtag?: (...args: any[]) => void }).gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'conversion_event_purchase', {});
      } else {
        console.warn('gtag 未初始化，无法上报转化事件');
      }
    }
  }, [submitStatus]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 行业选项
  const industryOptions = [
    { value: 'restaurant', label: t('contact.form.industry.options.restaurant') },
    { value: 'education', label: t('contact.form.industry.options.education') },
    { value: 'beauty', label: t('contact.form.industry.options.beauty') },
    { value: 'travel', label: t('contact.form.industry.options.travel') },
    { value: 'ecommerce', label: t('contact.form.industry.options.ecommerce') },
    { value: 'freelance', label: t('contact.form.industry.options.freelance') },
    { value: 'individual', label: t('contact.form.industry.options.individual') },
    { value: 'healthcare', label: t('contact.form.industry.options.healthcare') },
    { value: 'finance', label: t('contact.form.industry.options.finance') },
    { value: 'manufacturing', label: t('contact.form.industry.options.manufacturing') },
    { value: 'other', label: t('contact.form.industry.options.other') },
  ];

  const formFields = [
    {
      name: 'name' as const,
      label: t('contact.form.name.label'),
      placeholder: t('contact.form.name.placeholder'),
      type: 'text',
      icon: User,
      required: true,
    },
    {
      name: 'email' as const,
      label: t('contact.form.email.label'),
      placeholder: t('contact.form.email.placeholder'),
      type: 'email',
      icon: Mail,
      required: true,
    },
    {
      name: 'company' as const,
      label: t('contact.form.company.label'),
      placeholder: t('contact.form.company.placeholder'),
      type: 'text',
      icon: Building,
      required: false,
    },
    {
      name: 'phone' as const,
      label: t('contact.form.phone.label'),
      placeholder: t('contact.form.phone.placeholder'),
      type: 'tel',
      icon: Phone,
      required: false,
    },
    {
      name: 'subject' as const,
      label: t('contact.form.subject.label'),
      placeholder: t('contact.form.subject.placeholder'),
      type: 'text',
      icon: MessageSquare,
      required: true,
    },
  ];

  // FAQ数据
  const faqs = [
    // 首先显示原本在最后的两个问题
    { q: t('contact.faq.faq6.q'), a: t('contact.faq.faq6.a') },
    { q: t('contact.faq.faq9.q'), a: t('contact.faq.faq9.a') },
    // 然后显示新增的前5条
    { q: t('contact.faq.faq10.q'), a: t('contact.faq.faq10.a') },
    { q: t('contact.faq.faq11.q'), a: t('contact.faq.faq11.a') },
    { q: t('contact.faq.faq12.q'), a: t('contact.faq.faq12.a') },
    { q: t('contact.faq.faq13.q'), a: t('contact.faq.faq13.a') },
    { q: t('contact.faq.faq14.q'), a: t('contact.faq.faq14.a') },
    // 然后显示原有三条
    { q: t('contact.faq.faq2.q'), a: t('contact.faq.faq2.a') },
    { q: t('contact.faq.faq3.q'), a: t('contact.faq.faq3.a') },
    { q: t('contact.faq.faq4.q'), a: t('contact.faq.faq4.a') },
    // 其余新增条目按原顺序继续
    { q: t('contact.faq.faq15.q'), a: t('contact.faq.faq15.a') },
    { q: t('contact.faq.faq16.q'), a: t('contact.faq.faq16.a') },
    { q: t('contact.faq.faq17.q'), a: t('contact.faq.faq17.a') },
    { q: t('contact.faq.faq18.q'), a: t('contact.faq.faq18.a') },
    { q: t('contact.faq.faq19.q'), a: t('contact.faq.faq19.a') },
    /* { q: t('contact.faq.faq20.q'), a: t('contact.faq.faq20.a') }, */
    { q: t('contact.faq.faq21.q'), a: t('contact.faq.faq21.a') },
    { q: t('contact.faq.faq22.q'), a: t('contact.faq.faq22.a') },
    { q: t('contact.faq.faq23.q'), a: t('contact.faq.faq23.a') },
    { q: t('contact.faq.faq24.q'), a: t('contact.faq.faq24.a') },
    { q: t('contact.faq.faq25.q'), a: t('contact.faq.faq25.a') },
  ];
  // extraFaqs数组现在为空，因为已经移动到主faqs数组的前面
  const extraFaqs = [];
  // 随机打乱前五个FAQ
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 组合全部FAQ用于筛选
  const allFaqs = [...faqs, ...extraFaqs];
  const normalize = (s: string) =>
    (s || '')
      .toLowerCase()
      .replace(/[\u3000]/g, ' ') // 全角空格→半角
      .replace(/[、。．，,\.\-!！\?？:：;；（）()［］\[\]「」『』“”"…・]/g, ' ') // 标点转空格
      .replace(/\s+/g, ' ') // 连续空白归一
      .trim();
  const queryTokens = normalize(faqQuery).split(' ').filter(Boolean);
  const filteredFaqs = queryTokens.length
    ? allFaqs.filter((f) => {
        const haystack = normalize(`${f.q} ${f.a}`);
        return queryTokens.every((tok) => haystack.includes(tok));
      })
    : allFaqs;

  return (
    <div className="min-h-screen text-gray-900 pt-24" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e0f2fe 75%, #f0fdfa 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite'
    }}>
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-5">
              <span className="bg-gradient-to-r from-[#32E2C4] via-[#3F87F5] to-[#50FA7B] bg-clip-text text-transparent">
                {t('contact.title')}
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-[#50FA7B]/10 to-[#32E2C4]/10 border border-[#50FA7B]/30 rounded-2xl p-8 text-center"
            >
              <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 mx-auto mb-5 md:mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('contact.success.title')}</h2>
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8">{t('contact.success.message')}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmitStatus('idle')}
                className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-[#0EA5FF] to-[#6A7DFF] text-white text-sm md:text-base font-bold rounded-xl hover:opacity-90 transition-opacity duration-200"
              >
                {t('contact.success.newInquiry')}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-2xl p-5 md:p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                border: '1px solid rgba(20, 184, 166, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 flex items-center space-x-3"
                >
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-400">{t('contact.error.title')}</h3>
                    <p className="text-red-300">{t('contact.error.message')}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 行业选择字段 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t('contact.form.industry.label')}
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="w-5 h-5 text-gray-500" />
                      </div>
                      <select
                        {...register('industry', {
                          required: t('contact.validation.required'),
                        })}
                        defaultValue="restaurant"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200 appearance-none"
                      >
                        {industryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.industry && (
                      <p className="mt-1 text-sm text-red-400">{errors.industry.message}</p>
                    )}
                  </div>

                  {/* 其他行业输入框 - 只在选择"其他"时显示 */}
                  {watchedIndustry === 'other' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        {t('contact.form.industryOther.label')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageSquare className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                          {...register('industryOther')}
                          type="text"
                          placeholder={t('contact.form.industryOther.placeholder')}
                          className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                      {errors.industryOther && (
                        <p className="mt-1 text-sm text-red-400">{errors.industryOther.message}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 現状（サイトの有無） */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 md:gap-6 md:mb-6">
                                      <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        {t('contact.form.status.label')}<span className="ml-1 text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="w-5 h-5 text-gray-500" />
                        </div>
                        <select
                          {...register('status', { required: t('contact.validation.required') })}
                          defaultValue="no-site"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200 appearance-none"
                        >
                          <option value="no-site">{t('contact.form.status.options.noSite')}</option>
                          <option value="has-site">{t('contact.form.status.options.hasSite')}</option>
                        </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.status && (
                      <p className="mt-1 text-sm text-red-400">{errors.status.message as string}</p>
                    )}
                  </div>

                  {/* 网站URL输入框 - 只在选择"サイトあり"时显示 */}
                  {selectedStatus === 'has-site' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        {t('contact.form.websiteUrl.label')}<span className="ml-1 text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MessageSquare className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                          {...register('websiteUrl', {
                            required: selectedStatus === 'has-site' ? t('contact.validation.required') : false,
                            pattern: selectedStatus === 'has-site' ? {
                              value: /^https?:\/\/.+\..+/i,
                              message: t('contact.validation.url')
                            } : undefined,
                          })}
                          type="url"
                          placeholder={t('contact.form.websiteUrl.placeholder')}
                          className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                      {errors.websiteUrl && (
                        <p className="mt-1 text-sm text-red-400">{errors.websiteUrl.message}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map((field) => (
                    <div key={field.name} className={field.name === 'subject' ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <field.icon className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                          {...register(field.name, {
                            required: field.required ? t('contact.validation.required') : false,
                            pattern: field.type === 'email' ? {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: t('contact.validation.email')
                            } : undefined,
                          })}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                      {errors[field.name] && (
                        <p className="mt-1 text-sm text-red-400">{errors[field.name]?.message}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('contact.form.message.label')}
                  </label>
                  <textarea
                    {...register('message')}
                    rows={8}
                    placeholder={t('contact.form.message.placeholder')}
                    className="w-full px-4 py-2 md:py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200 resize-vertical"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-5 md:pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="w-full px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#0EA5FF] to-[#6A7DFF] text-white font-bold text-base md:text-lg rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('contact.form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('contact.form.submit')}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t('contact.faq.title')}</h2>
            <p className="text-lg text-gray-600">{t('contact.faq.subtitle')}</p>
          </div>
          {/* 検索ボックス */}
          <div className="max-w-3xl mx-auto mb-6">
            <input
              type="text"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder={t('contact.faq.searchPlaceholder')}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200"
            />
          </div>

          <div className="space-y-4">
            {filteredFaqs.length === 0 && (
              <p className="text-center text-gray-500">{t('contact.faq.noResults')}</p>
                        )}
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFAQs.has(faq.q);
              return (
                <div key={faq.q} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => toggleFAQ(faq.q)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#0EA5FF]/40 text-[#0EA5FF] bg-transparent">
                        <span className="font-bold text-lg">Q</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 flex-1">{faq.q}</h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 hover:border-[#0EA5FF] hover:bg-[#0EA5FF]/5">
                        {isOpen ? (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <div className="px-6 py-4 flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#6A7DFF]/40 text-[#6A7DFF] bg-transparent">
                          <span className="font-bold text-lg">A</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
            
          </div>
        </div>
      </section>
      {/* Additional Info */}
    </div>
  );
};