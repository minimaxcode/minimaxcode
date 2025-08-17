import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  Tag,
  Truck,
  MessageCircle,
  BarChart,
  Store,
  Settings,
  Shield,
  Target,
  Search,
  Globe,
  UserCheck,
  ArrowRight
} from 'lucide-react';

interface EcommerceProps {
  onPageChange: (page: string) => void;
}

export const Ecommerce = ({ onPageChange }: EcommerceProps) => {
  const { t } = useTranslation();

  const customerNeeds = [
    {
      icon: Package,
      title: t('ecommerce.needs.products.title'),
      description: t('ecommerce.needs.products.description'),
      color: 'blue'
    },
    {
      icon: ShoppingCart,
      title: t('ecommerce.needs.cart.title'),
      description: t('ecommerce.needs.cart.description'),
      color: 'green'
    },
    {
      icon: CreditCard,
      title: t('ecommerce.needs.payment.title'),
      description: t('ecommerce.needs.payment.description'),
      color: 'purple'
    },
    {
      icon: Users,
      title: t('ecommerce.needs.membership.title'),
      description: t('ecommerce.needs.membership.description'),
      color: 'orange'
    },
    {
      icon: Tag,
      title: t('ecommerce.needs.promotions.title'),
      description: t('ecommerce.needs.promotions.description'),
      color: 'teal'
    },
    {
      icon: Truck,
      title: t('ecommerce.needs.logistics.title'),
      description: t('ecommerce.needs.logistics.description'),
      color: 'indigo'
    },
    {
      icon: MessageCircle,
      title: t('ecommerce.needs.support.title'),
      description: t('ecommerce.needs.support.description'),
      color: 'red'
    },
    {
      icon: BarChart,
      title: t('ecommerce.needs.analytics.title'),
      description: t('ecommerce.needs.analytics.description'),
      color: 'pink'
    }
  ];

  const solutions = [
    {
      icon: Store,
      title: t('ecommerce.solutions.platform.title'),
      description: t('ecommerce.solutions.platform.description'),
      color: 'blue'
    },
    {
      icon: Settings,
      title: t('ecommerce.solutions.management.title'),
      description: t('ecommerce.solutions.management.description'),
      color: 'green'
    },
    {
      icon: Shield,
      title: t('ecommerce.solutions.payment.title'),
      description: t('ecommerce.solutions.payment.description'),
      color: 'purple'
    },
    {
      icon: Target,
      title: t('ecommerce.solutions.marketing.title'),
      description: t('ecommerce.solutions.marketing.description'),
      color: 'orange'
    },
    {
      icon: Truck,
      title: t('ecommerce.solutions.logistics.title'),
      description: t('ecommerce.solutions.logistics.description'),
      color: 'teal'
    },
    {
      icon: BarChart,
      title: t('ecommerce.solutions.analytics.title'),
      description: t('ecommerce.solutions.analytics.description'),
      color: 'indigo'
    },
    {
      icon: Search,
      title: t('ecommerce.solutions.seo.title'),
      description: t('ecommerce.solutions.seo.description'),
      color: 'red'
    },
    {
      icon: UserCheck,
      title: t('ecommerce.solutions.roles.title'),
      description: t('ecommerce.solutions.roles.description'),
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
      <section className="relative bg-transparent" style={{ marginTop: 'calc(var(--header-h) * -1)' }}>
        <div className="relative w-full aspect-[16/9] md:aspect-[5/2] lg:aspect-[21/9]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src="/images/ecommerce-hero.jpg" alt="Ecommerce Hero" className="w-full h-full object-cover object-center" />
          </motion.div>
        </div>
      </section>

      {/* Customer Needs Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">{t('ecommerce.needs.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('ecommerce.needs.subtitle')}
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
                <h3 className="text-2xl font-extrabold text-[#2F4766] leading-snug mb-3 tracking-wide">
                  {need.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {need.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">{t('ecommerce.solutions.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('ecommerce.solutions.subtitle')}
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
                <h3 className="text-2xl font-extrabold text-[#2F4766] leading-snug mb-3 tracking-wide">
                  {solution.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
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
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F4766] mb-4">
                {t('ecommerce.cta.title')}
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                {t('ecommerce.cta.description')}
              </p>
              
              <button
                onClick={() => onPageChange('quote')}
                className="inline-flex items-center px-8 py-4 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t('ecommerce.cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                {t('ecommerce.cta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 