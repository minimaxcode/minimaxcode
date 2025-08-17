import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  MessageSquare, 
  CreditCard, 
  Calendar,
  FileText,
  Video,
  Award,
  DollarSign,
  UserCheck,
  Star,
  BarChart,
  Globe,
  Palette,
  Search,
  ArrowRight
} from 'lucide-react';

interface EducationProps {
  onPageChange: (page: string) => void;
}

export const Education = ({ onPageChange }: EducationProps) => {
  const { t } = useTranslation();

  const customerNeeds = [
    {
      icon: BookOpen,
      title: t('education.needs.courses.title'),
      description: t('education.needs.courses.description'),
      color: 'blue'
    },
    {
      icon: MessageSquare,
      title: t('education.needs.registration.title'),
      description: t('education.needs.registration.description'),
      color: 'green'
    },
    {
      icon: GraduationCap,
      title: t('education.needs.teachers.title'),
      description: t('education.needs.teachers.description'),
      color: 'purple'
    },
    {
      icon: Star,
      title: t('education.needs.testimonials.title'),
      description: t('education.needs.testimonials.description'),
      color: 'orange'
    },
    {
      icon: CreditCard,
      title: t('education.needs.payment.title'),
      description: t('education.needs.payment.description'),
      color: 'teal'
    },
    {
      icon: Calendar,
      title: t('education.needs.scheduling.title'),
      description: t('education.needs.scheduling.description'),
      color: 'indigo'
    },
    {
      icon: FileText,
      title: t('education.needs.knowledge.title'),
      description: t('education.needs.knowledge.description'),
      color: 'red'
    },
    {
      icon: Video,
      title: t('education.needs.streaming.title'),
      description: t('education.needs.streaming.description'),
      color: 'pink'
    }
  ];

  const solutions = [
    {
      icon: Award,
      title: t('education.solutions.design.title'),
      description: t('education.solutions.design.description'),
      color: 'blue'
    },
    {
      icon: DollarSign,
      title: t('education.solutions.registration.title'),
      description: t('education.solutions.registration.description'),
      color: 'green'
    },
    {
      icon: BookOpen,
      title: t('education.solutions.management.title'),
      description: t('education.solutions.management.description'),
      color: 'purple'
    },
    {
      icon: UserCheck,
      title: t('education.solutions.teacher.title'),
      description: t('education.solutions.teacher.description'),
      color: 'orange'
    },
    {
      icon: BarChart,
      title: t('education.solutions.showcase.title'),
      description: t('education.solutions.showcase.description'),
      color: 'teal'
    },
    {
      icon: Globe,
      title: t('education.solutions.content.title'),
      description: t('education.solutions.content.description'),
      color: 'indigo'
    },
    {
      icon: Palette,
      title: t('education.solutions.custom.title'),
      description: t('education.solutions.custom.description'),
      color: 'red'
    },
    {
      icon: Search,
      title: t('education.solutions.seo.title'),
      description: t('education.solutions.seo.description'),
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
            <img src="/images/education-hero.jpg" alt="Education Hero" className="w-full h-full object-cover object-center" />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">{t('education.needs.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('education.needs.subtitle')}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2F4766]">{t('education.solutions.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('education.solutions.subtitle')}
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
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#2F4766] mb-4">
                {t('education.cta.title')}
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
                {t('education.cta.description')}
              </p>
              
              <button
                onClick={() => onPageChange('quote')}
                className="inline-flex items-center px-8 py-4 bg-[#0EA5FF] hover:bg-[#0284C7] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                {t('education.cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                {t('education.cta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 