import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Store, 
  Calendar, 
  Menu as MenuIcon, 
  Megaphone, 
  MessageSquare, 
  MapPin,
  Share2,
  Palette,
  ShoppingCart,
  Settings,
  Camera,
  Star,
  Navigation,
  Search,
  Users,
  ArrowRight
} from 'lucide-react';

interface RestaurantProps {
  onPageChange: (page: string) => void;
}

export const Restaurant = ({ onPageChange }: RestaurantProps) => {
  const { t } = useTranslation();

  const customerNeeds = [
    {
      icon: Store,
      title: t('restaurant.needs.branding.title'),
      description: t('restaurant.needs.branding.description'),
      color: 'orange'
    },
    {
      icon: Calendar,
      title: t('restaurant.needs.reservation.title'),
      description: t('restaurant.needs.reservation.description'),
      color: 'blue'
    },
    {
      icon: MenuIcon,
      title: t('restaurant.needs.menu.title'),
      description: t('restaurant.needs.menu.description'),
      color: 'green'
    },
    {
      icon: Megaphone,
      title: t('restaurant.needs.promotion.title'),
      description: t('restaurant.needs.promotion.description'),
      color: 'purple'
    },
    {
      icon: MessageSquare,
      title: t('restaurant.needs.feedback.title'),
      description: t('restaurant.needs.feedback.description'),
      color: 'teal'
    },
    {
      icon: MapPin,
      title: t('restaurant.needs.location.title'),
      description: t('restaurant.needs.location.description'),
      color: 'red'
    },
    {
      icon: Share2,
      title: t('restaurant.needs.social.title'),
      description: t('restaurant.needs.social.description'),
      color: 'indigo'
    }
  ];

  const solutions = [
    {
      icon: Palette,
      title: t('restaurant.solutions.design.title'),
      description: t('restaurant.solutions.design.description'),
      color: 'orange'
    },
    {
      icon: ShoppingCart,
      title: t('restaurant.solutions.ordering.title'),
      description: t('restaurant.solutions.ordering.description'),
      color: 'blue'
    },
    {
      icon: Settings,
      title: t('restaurant.solutions.cms.title'),
      description: t('restaurant.solutions.cms.description'),
      color: 'green'
    },
    {
      icon: Camera,
      title: t('restaurant.solutions.media.title'),
      description: t('restaurant.solutions.media.description'),
      color: 'purple'
    },
    {
      icon: Star,
      title: t('restaurant.solutions.review.title'),
      description: t('restaurant.solutions.review.description'),
      color: 'teal'
    },
    {
      icon: Navigation,
      title: t('restaurant.solutions.location.title'),
      description: t('restaurant.solutions.location.description'),
      color: 'red'
    },
    {
      icon: Search,
      title: t('restaurant.solutions.seo.title'),
      description: t('restaurant.solutions.seo.description'),
      color: 'indigo'
    },
    {
      icon: Users,
      title: t('restaurant.solutions.social.title'),
      description: t('restaurant.solutions.social.description'),
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      teal: 'bg-teal-100 text-teal-600 border-teal-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
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
            <img src="/images/restaurant-hero.jpg" alt="Restaurant Hero" className="w-full h-full object-contain object-center" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F4766]">{t('restaurant.needs.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('restaurant.needs.subtitle')}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F4766]">{t('restaurant.solutions.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('restaurant.solutions.subtitle')}
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
                  <Store className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F4766] mb-4">
                {t('restaurant.cta.title')}
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                {t('restaurant.cta.description')}
              </p>
              
              <button
                onClick={() => onPageChange('quote')}
                className="inline-flex items-center px-8 py-4 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Store className="w-5 h-5 mr-2" />
                {t('restaurant.cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                {t('restaurant.cta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 