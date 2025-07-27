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
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

export const Contact = ({ onPageChange, quoteDetails }: ContactProps) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // [MODIFIED] react-hook-formからsetValueを取得して、プログラム的にフォームの値を設定できるようにする
    // [MODIFIED] Get setValue from react-hook-form to programmatically set form values
    setValue,
  } = useForm<ContactFormData>();
  
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
    {
      q: t('contact.faq.faq1.q'),
      a: t('contact.faq.faq1.a'),
    },
    {
      q: t('contact.faq.faq2.q'),
      a: t('contact.faq.faq2.a'),
    },
    {
      q: t('contact.faq.faq3.q'),
      a: t('contact.faq.faq3.a'),
    },
    {
      q: t('contact.faq.faq4.q'),
      a: t('contact.faq.faq4.a'),
    },
    {
      q: t('contact.faq.faq5.q'),
      a: t('contact.faq.faq5.a'),
    },
  ];
  // 其余FAQ保持原顺序
  const extraFaqs = [
    {
      q: t('contact.faq.faq6.q'),
      a: t('contact.faq.faq6.a'),
    },
    {
      q: t('contact.faq.faq7.q'),
      a: t('contact.faq.faq7.a'),
    },
    {
      q: t('contact.faq.faq8.q'),
      a: t('contact.faq.faq8.a'),
    },
    {
      q: t('contact.faq.faq9.q'),
      a: t('contact.faq.faq9.a'),
    },
  ];
  // 随机打乱前五个FAQ
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

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
      <section className="relative overflow-hidden py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#32E2C4] via-[#3F87F5] to-[#50FA7B] bg-clip-text text-transparent">
                {t('contact.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-[#50FA7B]/10 to-[#32E2C4]/10 border border-[#50FA7B]/30 rounded-2xl p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contact.success.title')}</h2>
              <p className="text-xl text-gray-600 mb-8">{t('contact.success.message')}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmitStatus('idle')}
                className="px-8 py-3 bg-emerald-600 text-black font-bold rounded-xl hover:bg-emerald-600/90 transition-colors duration-200"
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
              className="rounded-2xl p-8"
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
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200"
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
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <textarea
                    {...register('message', {
                      required: t('contact.validation.required'),
                    })}
                    rows={10}
                    placeholder={t('contact.form.message.placeholder')}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200 resize-vertical"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#50FA7B] to-[#32E2C4] text-black font-bold text-lg rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
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
          <div className="space-y-8">
            {shuffle(faqs).map((faq, idx) => (
              <div key={faq.q} className="rounded-xl p-6 shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
            {extraFaqs.map((faq) => (
              <div key={faq.q} className="rounded-xl p-6 shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Additional Info */}
    </div>
  );
};