import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Scale, ArrowLeft } from 'lucide-react';

interface TermsProps {
  onPageChange: (page: string) => void;
}

export const Terms = ({ onPageChange }: TermsProps) => {
  const { t } = useTranslation();

  const sections = [
    'overview',
    'service',
    'contract',
    'payment',
    'delivery',
    'warranty',
    'intellectual',
    'prohibited',
    'termination',
    'changes',
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#50FA7B]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3F87F5]/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Scale className="w-12 h-12 text-[#50FA7B] mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-[#50FA7B] via-[#32E2C4] to-[#3F87F5] bg-clip-text text-transparent">
                  {t('terms.title')}
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300">{t('terms.lastUpdated')}</p>
          </motion.div>

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => onPageChange('home')}
            className="flex items-center space-x-2 text-gray-400 hover:text-[#50FA7B] transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>ホームに戻る</span>
          </motion.button>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12"
          >
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-800 last:border-b-0 pb-8 last:pb-0"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#50FA7B] to-[#32E2C4] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        {t(`terms.sections.${section}.title`)}
                      </h2>
                      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {t(`terms.sections.${section}.content`)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#50FA7B]/10 to-[#32E2C4]/10 border border-[#50FA7B]/30 rounded-2xl p-8"
          >
            <div className="flex items-start space-x-4">
              <FileText className="w-8 h-8 text-[#50FA7B] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">重要事項</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong className="text-[#50FA7B]">契約成立について：</strong>
                    当社からの見積書に対してお客様が承諾された時点で契約が成立いたします。
                  </p>
                  <p>
                    <strong className="text-[#50FA7B]">お支払いについて：</strong>
                    料金は納品完了後のお支払いとなります。初期費用は一切いただきません。
                  </p>
                  <p>
                    <strong className="text-[#50FA7B]">品質保証について：</strong>
                    納品後30日間は無償で軽微な修正に対応いたします。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              利用規約に関するご質問
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              サービス利用に関してご不明な点がございましたら、お気軽にお問い合わせください
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('contact')}
                className="px-8 py-4 bg-[#50FA7B] text-black font-bold text-lg rounded-xl hover:bg-[#50FA7B]/90 transition-colors duration-200"
              >
                お問い合わせ
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('service')}
                className="px-8 py-4 border-2 border-[#32E2C4] text-[#32E2C4] font-bold text-lg rounded-xl hover:bg-[#32E2C4] hover:text-black transition-colors duration-200"
              >
                サービス詳細を見る
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
