import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FlowProps {
  onPageChange: (page: string) => void;
}

export const Flow = ({ onPageChange }: FlowProps) => {
  const { t } = useTranslation();

  const flowSteps = [
    {
      title: t('flow.steps.step1.title'),
      description: t('flow.steps.step1.description'),
    },
    {
      title: t('flow.steps.step2.title'),
      description: t('flow.steps.step2.description'),
    },
    {
      title: t('flow.steps.step3.title'),
      description: t('flow.steps.step3.description'),
    },
    {
      title: t('flow.steps.step4.title'),
      description: t('flow.steps.step4.description'),
    },
    {
      title: t('flow.steps.step5.title'),
      description: t('flow.steps.step5.description'),
    },
    {
      title: t('flow.steps.step6.title'),
      description: t('flow.steps.step6.description'),
    },
    {
      title: t('flow.steps.step7.title'),
      description: t('flow.steps.step7.description'),
    },
    {
      title: t('flow.steps.step8.title'),
      description: t('flow.steps.step8.description'),
    },
  ];

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
                {t('flow.hero.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('flow.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col space-y-8 sm:space-y-12 ml-2 sm:ml-4">
            {flowSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* 竖线连接 */}
                {idx < flowSteps.length - 1 && (
                  <div className="absolute -left-1 top-10 w-1 bg-teal-200 hidden sm:block" style={{ height: 'calc(100% + 3rem)' }}></div>
                )}
                {/* 数字圆圈 */}
                <div className="absolute -left-4 sm:-left-6 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-full text-white font-bold text-base sm:text-lg shadow-md z-10">
                  {idx + 1}
                </div>
                {/* 内容 */}
                <div className="ml-6 sm:ml-8 break-words">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 mt-1">{step.title}</h2>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {step.description}
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
