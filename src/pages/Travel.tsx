import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Building, 
  CreditCard, 
  Map, 
  Coffee,
  Star,
  Globe,
  MessageCircle,
  Camera,
  Calendar,
  Wallet,
  Languages,
  MapPin,
  Search,
  Users,
  BarChart,
  ArrowRight
} from 'lucide-react';

interface TravelProps {
  onPageChange: (page: string) => void;
}

export const Travel = ({ onPageChange }: TravelProps) => {
  const { t } = useTranslation();

  const customerNeeds = [
    {
      icon: Building,
      title: t('travel.needs.rooms.title'),
      description: t('travel.needs.rooms.description'),
      color: 'blue'
    },
    {
      icon: Calendar,
      title: t('travel.needs.booking.title'),
      description: t('travel.needs.booking.description'),
      color: 'green'
    },
    {
      icon: Map,
      title: t('travel.needs.tours.title'),
      description: t('travel.needs.tours.description'),
      color: 'purple'
    },
    {
      icon: Coffee,
      title: t('travel.needs.services.title'),
      description: t('travel.needs.services.description'),
      color: 'orange'
    },
    {
      icon: Star,
      title: t('travel.needs.reviews.title'),
      description: t('travel.needs.reviews.description'),
      color: 'teal'
    },
    {
      icon: Globe,
      title: t('travel.needs.multilingual.title'),
      description: t('travel.needs.multilingual.description'),
      color: 'indigo'
    },
    {
      icon: MessageCircle,
      title: t('travel.needs.support.title'),
      description: t('travel.needs.support.description'),
      color: 'red'
    }
  ];

  const solutions = [
    {
      icon: Camera,
      title: t('travel.solutions.design.title'),
      description: t('travel.solutions.design.description'),
      color: 'blue'
    },
    {
      icon: Calendar,
      title: t('travel.solutions.booking.title'),
      description: t('travel.solutions.booking.description'),
      color: 'green'
    },
    {
      icon: Languages,
      title: t('travel.solutions.multilingual.title'),
      description: t('travel.solutions.multilingual.description'),
      color: 'purple'
    },
    {
      icon: MapPin,
      title: t('travel.solutions.location.title'),
      description: t('travel.solutions.location.description'),
      color: 'orange'
    },
    {
      icon: Users,
      title: t('travel.solutions.cms.title'),
      description: t('travel.solutions.cms.description'),
      color: 'teal'
    },
    {
      icon: Search,
      title: t('travel.solutions.seo.title'),
      description: t('travel.solutions.seo.description'),
      color: 'indigo'
    },
    {
      icon: MessageCircle,
      title: t('travel.solutions.support.title'),
      description: t('travel.solutions.support.description'),
      color: 'red'
    },
    {
      icon: BarChart,
      title: t('travel.solutions.analytics.title'),
      description: t('travel.solutions.analytics.description'),
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      teal: 'bg-teal-100 text-teal-600 border-teal-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      pink: 'bg-pink-100 text-pink-600 border-pink-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen text-gray-900 pt-24" style={{ background: 'linear-gradient(180deg, #F6FAFF 0%, #FFFFFF 100%)' }}>
      {/* Hero Section */}
      <section className="relative bg-transparent pt-[var(--header-h)] md:pt-0 md:-mt-[var(--header-h)]">
        <div className="relative w-full md:grid h-[55vh] sm:h-[50vh] md:h-auto md:aspect-[21/9] md:min-h-[500px] lg:min-h-[560px] max-w-[1536px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-start-1 md:row-start-1"
          >
            <img src="/images/travel-hero-1600.webp" alt="Travel Hero" className="w-full h-full object-contain object-center" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F4766]">{t('travel.needs.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('travel.needs.subtitle')}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F4766]">{t('travel.solutions.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('travel.solutions.subtitle')}
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
                  <Building className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F4766] mb-4">
                {t('travel.cta.title')}
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                {t('travel.cta.description')}
              </p>
              
              <button
                onClick={() => onPageChange('quote')}
                className="inline-flex items-center px-8 py-4 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Building className="w-5 h-5 mr-2" />
                {t('travel.cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                {t('travel.cta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 