import { motion } from 'framer-motion';
import React from 'react';

interface FlowProps {
  onPageChange: (page: string) => void;
}

const flowSteps = [
  {
    title: 'お見積もり・お問い合わせ',
    description: 'お見積もり画面でご記入いただいた後、お問い合わせからご連絡ください。\nご要望をお聞かせいただき、お客様のご予算に合わせた最適なプランとお見積もりをご提案いたします。\nご相談・ご質問だけでも大歓迎です。',
  },
  {
    title: 'ヒアリング',
    description: '詳細なご要望やイメージ、制作スケジュールや最適なサイト構成を検討いただき、請求書をお送りいたします。\n※5万円以下のご依頼の場合、Googleフォームにて行います。',
  },
  {
    title: 'ご契約・お支払い',
    description: 'お見積もり内容にご納得いただけましたら、ご契約となります。\n料金を事前にお支払いいただきます。\n弊社指定の口座へお振込をお願いいたします。前金と後金に分けてのお支払いも可能です。',
  },
  {
    title: '着手',
    description: '掲載したい原稿（情報・文章・画像等）をご用意ください。\n原稿が揃い次第、ホームページ作成をスタートいたします。必要に応じてページ構成案をご提案させていただきます。',
  },
  {
    title: 'コーディング・開発',
    description: 'デザインを基に、レスポンシブ対応のコーディングやシステム開発を進めます。\n進捗は随時ご報告いたします。',
  },
  {
    title: 'ご確認・修正',
    description: '完成した内容をご確認いただき、ご要望に応じて修正対応いたします。\nご満足いただけるまで何度でも修正いたします。',
  },
  {
    title: '納品・公開',
    description: '最終確認後、納品・公開となります。\nサーバー設定やドメイン取得、SEO対策もサポートいたします。',
  },
  {
    title: 'アフターサポート',
    description: '納品後も運用・更新・保守など、安心のサポート体制でご対応いたします。\nお困りの際はいつでもご相談ください。',
  },
];

export const Flow = ({ onPageChange }: FlowProps) => {
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
                ご利用の流れ
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              お問い合わせから納品・アフターサポートまで、安心してお任せいただけます。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative ml-4 transform translate-x-16 max-w-3xl whitespace-nowrap">
            {flowSteps.map((step, idx) => (
              <div key={idx} className="relative mb-12">
                {/* 竖线连接 */}
                {idx < flowSteps.length - 1 && (
                  <div className="absolute -left-1 top-10 w-1 bg-teal-200" style={{ height: 'calc(100% + 3rem)' }}></div>
                )}
                {/* 数字圆圈 */}
                <div className="absolute -left-6 flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full text-white font-bold text-lg shadow-md z-10">
                  {idx + 1}
                </div>
                {/* 内容 */}
                <div className="ml-6">
                  <h2 className="text-2xl font-bold mb-2 mt-1">{step.title}</h2>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {step.description.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== step.description.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
