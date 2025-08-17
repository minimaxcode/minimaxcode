import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  User, 
  DollarSign, 
  Calendar, 
  Star,
  Phone,
  PenTool,
  CreditCard,
  Palette,
  Camera,
  FileText,
  Clock,
  Globe,
  Search,
  Settings,
  Share2,
  ArrowRight
} from 'lucide-react';

interface FreelanceProps {
  onPageChange: (page: string) => void;
}

export const Freelance = ({ onPageChange }: FreelanceProps) => {
  const { t } = useTranslation();

  const customerNeeds = [
    {
      icon: Briefcase,
      title: t('freelance.needs.portfolio.title'),
      description: t('freelance.needs.portfolio.description'),
      color: 'blue'
    },
    {
      icon: User,
      title: t('freelance.needs.profile.title'),
      description: t('freelance.needs.profile.description'),
      color: 'green'
    },
    {
      icon: DollarSign,
      title: t('freelance.needs.services.title'),
      description: t('freelance.needs.services.description'),
      color: 'purple'
    },
    {
      icon: Calendar,
      title: t('freelance.needs.booking.title'),
      description: t('freelance.needs.booking.description'),
      color: 'orange'
    },
    {
      icon: Star,
      title: t('freelance.needs.testimonials.title'),
      description: t('freelance.needs.testimonials.description'),
      color: 'teal'
    },
    {
      icon: Phone,
      title: t('freelance.needs.contact.title'),
      description: t('freelance.needs.contact.description'),
      color: 'indigo'
    },
    {
      icon: PenTool,
      title: t('freelance.needs.blog.title'),
      description: t('freelance.needs.blog.description'),
      color: 'red'
    },
    {
      icon: CreditCard,
      title: t('freelance.needs.payment.title'),
      description: t('freelance.needs.payment.description'),
      color: 'pink'
    }
  ];

  const solutions = [
    {
      icon: Palette,
      title: t('freelance.solutions.design.title'),
      description: t('freelance.solutions.design.description'),
      color: 'blue'
    },
    {
      icon: Camera,
      title: t('freelance.solutions.portfolio.title'),
      description: t('freelance.solutions.portfolio.description'),
      color: 'green'
    },
    {
      icon: FileText,
      title: t('freelance.solutions.profile.title'),
      description: t('freelance.solutions.profile.description'),
      color: 'purple'
    },
    {
      icon: Clock,
      title: t('freelance.solutions.booking.title'),
      description: t('freelance.solutions.booking.description'),
      color: 'orange'
    },
    {
      icon: Globe,
      title: t('freelance.solutions.blog.title'),
      description: t('freelance.solutions.blog.description'),
      color: 'teal'
    },
    {
      icon: Search,
      title: t('freelance.solutions.seo.title'),
      description: t('freelance.solutions.seo.description'),
      color: 'indigo'
    },
    {
      icon: Settings,
      title: t('freelance.solutions.cms.title'),
      description: t('freelance.solutions.cms.description'),
      color: 'red'
    },
    {
      icon: Share2,
      title: t('freelance.solutions.social.title'),
      description: t('freelance.solutions.social.description'),
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
        <div className="relative w-full aspect-[16/9] md:aspect-[5/2] lg:aspect-[21/9]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src="/images/freelance-hero.jpg" alt="Freelance Hero" className="w-full h-full object-cover object-center" />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">{t('freelance.needs.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('freelance.needs.subtitle')}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">{t('freelance.solutions.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('freelance.solutions.subtitle')}
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
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F4766] mb-4">
                {t('freelance.cta.title')}
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                {t('freelance.cta.description')}
              </p>
              
              <button
                onClick={() => onPageChange('quote')}
                className="inline-flex items-center px-8 py-4 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                {t('freelance.cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                {t('freelance.cta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 