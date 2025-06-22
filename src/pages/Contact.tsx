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
    quoteSummary?: string;
    quoteSubject?: string;
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
    if (quoteDetails) {
      if (quoteDetails.quoteSubject) {
        setValue('subject', quoteDetails.quoteSubject);
      }
      if (quoteDetails.quoteSummary) {
        setValue('message', quoteDetails.quoteSummary);
      }
    }
  }, [quoteDetails, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send data to your backend
      console.log('Form data:', data);
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
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

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#32E2C4]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3F87F5]/20 rounded-full filter blur-3xl" />
        </div>
        
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-[#50FA7B]/10 to-[#32E2C4]/10 border border-[#50FA7B]/30 rounded-2xl p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-[#50FA7B] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">{t('contact.success.title')}</h2>
              <p className="text-xl text-gray-300 mb-8">{t('contact.success.message')}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmitStatus('idle')}
                className="px-8 py-3 bg-[#50FA7B] text-black font-bold rounded-xl hover:bg-[#50FA7B]/90 transition-colors duration-200"
              >
                新しいお問い合わせ
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
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
                      <label className="block text-sm font-semibold text-white mb-2">
                        {field.label}
                        {field.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <field.icon className="w-5 h-5 text-gray-400" />
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
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200"
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
                  <label className="block text-sm font-semibold text-white mb-2">
                    {t('contact.form.message.label')}
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <textarea
                    {...register('message', {
                      required: t('contact.validation.required'),
                    })}
                    rows={10}
                    placeholder={t('contact.form.message.placeholder')}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32E2C4] focus:border-transparent transition-colors duration-200 resize-vertical"
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
                        <span>送信中...</span>
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

      {/* Additional Info */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              お問い合わせ後の流れ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#3F87F5] to-[#32E2C4] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">自動返信</h3>
                <p className="text-gray-300 text-sm">お問い合わせ受付の自動返信メールをお送りします</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#32E2C4] to-[#50FA7B] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">担当者からの連絡</h3>
                <p className="text-gray-300 text-sm">2営業日以内に担当者から詳細をご連絡いたします</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#50FA7B] to-[#3F87F5] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">詳細ヒアリング</h3>
                <p className="text-gray-300 text-sm">ご要望を詳しくお聞きし、最適なご提案をいたします</p>
              </div>
            </div>
            
            <div className="mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('quote')}
                className="px-8 py-3 border-2 border-[#32E2C4] text-[#32E2C4] font-bold rounded-xl hover:bg-[#32E2C4] hover:text-black transition-colors duration-200"
              >
                見積もりツールを試す
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};