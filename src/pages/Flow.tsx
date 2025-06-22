import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Handshake, Code, Package, Headphones, ArrowRight, Clock } from 'lucide-react';

interface FlowProps {
  onPageChange: (page: string) => void;
}

export const Flow = ({ onPageChange }: FlowProps) => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: MessageSquare,
      title: t('flow.steps.step1.title'),
      description: t('flow.steps.step1.description'),
      gradient: 'from-[#3F87F5] to-[#32E2C4]',
      duration: '即日',
    },
    {
      icon: FileText,
      title: t('flow.steps.step2.title'),
      description: t('flow.steps.step2.description'),
      gradient: 'from-[#32E2C4] to-[#50FA7B]',
      duration: '2営業日',
    },
    {
      icon: Handshake,
      title: t('flow.steps.step3.title'),
      description: t('flow.steps.step3.description'),
      gradient: 'from-[#50FA7B] to-[#3F87F5]',
      duration: '1営業日',
    },
    {
      icon: Code,
      title: t('flow.steps.step4.title'),
      description: t('flow.steps.step4.description'),
      gradient: 'from-[#3F87F5] to-[#32E2C4]',
      duration: '2-7営業日',
    },
    {
      icon: Package,
      title: t('flow.steps.step5.title'),
      description: t('flow.steps.step5.description'),
      gradient: 'from-[#32E2C4] to-[#50FA7B]',
      duration: '1営業日',
    },
    {
      icon: Headphones,
      title: t('flow.steps.step6.title'),
      description: t('flow.steps.step6.description'),
      gradient: 'from-[#50FA7B] to-[#3F87F5]',
      duration: '継続',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#32E2C4]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#50FA7B]/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#32E2C4] via-[#50FA7B] to-[#3F87F5] bg-clip-text text-transparent">
                {t('flow.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('flow.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
              >
                {/* Content */}
                <div className="lg:w-1/2 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-[#32E2C4] font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{step.duration}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{step.title}</h2>
                  <p className="text-lg text-gray-300 leading-relaxed">{step.description}</p>
                </div>

                {/* Visual */}
                <div className="lg:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-3xl blur-xl" 
                         style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
                    <div className={`relative bg-gradient-to-r ${step.gradient} p-8 rounded-3xl`}>
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <step.icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              全体スケジュール
            </h2>
            <p className="text-xl text-gray-300">最短2日から最長2週間で完成</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#50FA7B]/10 to-[#32E2C4]/10 border border-[#50FA7B]/30 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-[#50FA7B] mb-4">特急コース</h3>
              <p className="text-4xl font-bold text-white mb-4">2-3日</p>
              <p className="text-gray-300">シンプルなLP・小規模サイト</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#32E2C4]/10 to-[#3F87F5]/10 border border-[#32E2C4]/30 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-[#32E2C4] mb-4">標準コース</h3>
              <p className="text-4xl font-bold text-white mb-4">1-2週間</p>
              <p className="text-gray-300">企業サイト・中規模プロジェクト</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#3F87F5]/10 to-[#50FA7B]/10 border border-[#3F87F5]/30 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-[#3F87F5] mb-4">じっくりコース</h3>
              <p className="text-4xl font-bold text-white mb-4">3-4週間</p>
              <p className="text-gray-300">大規模サイト・複雑な機能</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              制作の特徴
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#3F87F5] to-[#32E2C4] rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">密なコミュニケーション</h3>
              <p className="text-gray-300">各段階で細かく確認を取りながら進行します</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#32E2C4] to-[#50FA7B] rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI補助による高速開発</h3>
              <p className="text-gray-300">AI技術を活用して効率的に制作を進めます</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#50FA7B] to-[#3F87F5] rounded-lg flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">充実のアフターサポート</h3>
              <p className="text-gray-300">納品後も安心のサポート体制をご用意</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#3F87F5]/20 via-[#32E2C4]/20 to-[#50FA7B]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              プロジェクトを始めませんか？
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              まずはお気軽にお問い合わせください。詳細なスケジュールをご提案いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('contact')}
                className="px-8 py-4 bg-[#50FA7B] text-black font-bold text-lg rounded-xl hover:bg-[#50FA7B]/90 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>お問い合わせ</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange('quote')}
                className="px-8 py-4 border-2 border-[#32E2C4] text-[#32E2C4] font-bold text-lg rounded-xl hover:bg-[#32E2C4] hover:text-black transition-colors duration-200"
              >
                見積もりを取る
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
