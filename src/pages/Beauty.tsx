import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Scissors, 
  Image, 
  Calendar, 
  User, 
  CreditCard, 
  Megaphone,
  MessageSquare,
  Palette,
  Clock,
  Camera,
  Users,
  Target,
  MapPin,
  Share2,
  Award,
  ArrowRight
} from 'lucide-react';

interface BeautyProps {
  onPageChange: (page: string) => void;
}

export const Beauty = ({ onPageChange }: BeautyProps) => {
  const { t } = useTranslation();

  const customerNeeds = [
    {
      icon: Scissors,
      title: t('beauty.needs.services.title'),
      description: t('beauty.needs.services.description'),
      color: 'pink'
    },
    {
      icon: Image,
      title: t('beauty.needs.portfolio.title'),
      description: t('beauty.needs.portfolio.description'),
      color: 'purple'
    },
    {
      icon: Calendar,
      title: t('beauty.needs.booking.title'),
      description: t('beauty.needs.booking.description'),
      color: 'blue'
    },
    {
      icon: User,
      title: t('beauty.needs.stylists.title'),
      description: t('beauty.needs.stylists.description'),
      color: 'green'
    },
    {
      icon: CreditCard,
      title: t('beauty.needs.membership.title'),
      description: t('beauty.needs.membership.description'),
      color: 'orange'
    },
    {
      icon: Megaphone,
      title: t('beauty.needs.promotions.title'),
      description: t('beauty.needs.promotions.description'),
      color: 'teal'
    },
    {
      icon: MessageSquare,
      title: t('beauty.needs.reviews.title'),
      description: t('beauty.needs.reviews.description'),
      color: 'indigo'
    }
  ];

  const solutions = [
    {
      icon: Palette,
      title: t('beauty.solutions.design.title'),
      description: t('beauty.solutions.design.description'),
      color: 'pink'
    },
    {
      icon: Clock,
      title: t('beauty.solutions.booking.title'),
      description: t('beauty.solutions.booking.description'),
      color: 'blue'
    },
    {
      icon: Camera,
      title: t('beauty.solutions.portfolio.title'),
      description: t('beauty.solutions.portfolio.description'),
      color: 'purple'
    },
    {
      icon: User,
      title: t('beauty.solutions.stylists.title'),
      description: t('beauty.solutions.stylists.description'),
      color: 'green'
    },
    {
      icon: Award,
      title: t('beauty.solutions.cms.title'),
      description: t('beauty.solutions.cms.description'),
      color: 'orange'
    },
    {
      icon: Users,
      title: t('beauty.solutions.membership.title'),
      description: t('beauty.solutions.membership.description'),
      color: 'teal'
    },
    {
      icon: MapPin,
      title: t('beauty.solutions.meo.title'),
      description: t('beauty.solutions.meo.description'),
      color: 'indigo'
    },
    {
      icon: Share2,
      title: t('beauty.solutions.social.title'),
      description: t('beauty.solutions.social.description'),
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      pink: 'bg-pink-100 text-pink-600 border-pink-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      teal: 'bg-teal-100 text-teal-600 border-teal-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.pink;
  };

  return (
    <div className="min-h-screen text-gray-900 pt-24" style={{ background: 'linear-gradient(180deg, #F6FAFF 0%, #FFFFFF 100%)' }}>
      {/* Hero Section */}
      <section className="relative bg-transparent pt-[var(--header-h)] md:pt-0 md:-mt-[var(--header-h)]">
        <div className="relative w-full h-auto aspect-[16/9] md:aspect-[5/2] lg:aspect-[21/9]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src="/images/beauty-hero.jpg" alt="Beauty Hero" className="w-full h-full object-contain md:object-cover object-center" />
          </motion.div>
        </div>
      </section>

      {/* Customer Needs Section */}
      <section className="py-12 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F4766]">{t('beauty.needs.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('beauty.needs.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {customerNeeds.map((need, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-[0_6px_24px_rgba(2,132,199,0.08)] border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${getColorClasses(need.color)}`}>
                  <need.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-[#2F4766] leading-snug mb-3 tracking-wide">
                  {need.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {need.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-12 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F4766]">{t('beauty.solutions.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('beauty.solutions.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-[0_6px_24px_rgba(2,132,199,0.08)] border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${getColorClasses(solution.color)}`}>
                  <solution.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-[#2F4766] leading-snug mb-3 tracking-wide">
                  {solution.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#0EA5FF] rounded-full flex items-center justify-center">
                  <Scissors className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F4766] mb-4">
                {t('beauty.cta.title')}
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                {t('beauty.cta.description')}
              </p>
              
              <button
                onClick={() => onPageChange('quote')}
                className="inline-flex items-center px-8 py-4 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Scissors className="w-5 h-5 mr-2" />
                {t('beauty.cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                {t('beauty.cta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 