import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';

// [MODIFIED] onPageChangeプロパティの型を、データペイロードを受け取れるように変更
// [MODIFIED] Changed the onPageChange prop type to accept a data payload
interface QuoteProps {
  onPageChange: (page: string, data?: any) => void;
}

interface QuoteData {
  websiteType: string;
  pageCount: number;
  features: string[];
  design: string;
  timeline: string;
}

export const Quote = ({ onPageChange }: QuoteProps) => {
  const { t } = useTranslation();

  const [quoteData, setQuoteData] = useState<QuoteData>({
    websiteType: 'corporate',
    pageCount: 10,
    features: [],
    design: '',
    timeline: '',
  });

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pricing calculation logic
  const calculatePrice = () => {
    // Base price per page for corporate website
    const pricePerPage = 15000; // ¥15,000 per page
    let basePrice = quoteData.pageCount * pricePerPage;
    
    // Minimum base price
    const minimumPrice = 200000;
    if (basePrice < minimumPrice) {
      basePrice = minimumPrice;
    }
    
    let minMultiplier = 1;
    let maxMultiplier = 1.5;

    // Features additional cost
    let featureCost = 0;
    quoteData.features.forEach(feature => {
      switch (feature) {
        case 'contactForm':
          featureCost += 30000;
          break;
        case 'blog':
          featureCost += 80000;
          break;
        case 'multilingual':
          featureCost += 120000;
          break;
        case 'cms':
          featureCost += 150000;
          break;
        case 'ecommerce':
          featureCost += 300000;
          break;
        case 'membership':
          featureCost += 250000;
          break;
      }
    });

    // Design complexity multiplier
    if (quoteData.design === 'simple') {
      minMultiplier *= 0.8;
      maxMultiplier *= 1.0;
    } else if (quoteData.design === 'standard') {
      minMultiplier *= 1.0;
      maxMultiplier *= 1.3;
    } else if (quoteData.design === 'complex') {
      minMultiplier *= 1.5;
      maxMultiplier *= 2.0;
    }

    // Timeline adjustment
    if (quoteData.timeline === 'rush') {
      minMultiplier *= 1.5;
      maxMultiplier *= 2.0;
    } else if (quoteData.timeline === 'normal') {
      minMultiplier *= 1.0;
      maxMultiplier *= 1.2;
    } else if (quoteData.timeline === 'flexible') {
      minMultiplier *= 0.9;
      maxMultiplier *= 1.0;
    }

    const minPrice = Math.round((basePrice * minMultiplier + featureCost) / 10000) * 10000;
    const maxPrice = Math.round((basePrice * maxMultiplier + featureCost) / 10000) * 10000;

    return { min: minPrice, max: maxPrice };
  };

  const handleFeatureChange = (feature: string) => {
    setQuoteData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = () => {
    if (quoteData.websiteType && quoteData.pageCount >= 5 && quoteData.design && quoteData.timeline) {
      setShowResult(true);
    }
  };

  const isFormValid = quoteData.websiteType && quoteData.pageCount >= 5 && quoteData.design && quoteData.timeline;
  const priceRange = isFormValid ? calculatePrice() : { min: 0, max: 0 };

  const websiteTypeOptions = [
    { value: 'corporate', label: t('quote.form.websiteType.options.corporate') },
  ];

  const featureOptions = [
    { value: 'contactForm', label: t('quote.form.features.options.contactForm') },
    { value: 'blog', label: t('quote.form.features.options.blog') },
    { value: 'multilingual', label: t('quote.form.features.options.multilingual') },
    { value: 'cms', label: t('quote.form.features.options.cms') },
    { value: 'ecommerce', label: t('quote.form.features.options.ecommerce') },
    { value: 'membership', label: t('quote.form.features.options.membership') },
  ];

  const designOptions = [
    { value: 'simple', label: t('quote.form.design.options.simple') },
    { value: 'standard', label: t('quote.form.design.options.standard') },
    { value: 'complex', label: t('quote.form.design.options.complex') },
  ];

  const timelineOptions = [
    { value: 'rush', label: t('quote.form.timeline.options.rush') },
    { value: 'normal', label: t('quote.form.timeline.options.normal') },
    { value: 'flexible', label: t('quote.form.timeline.options.flexible') },
  ];
  
  // [ADDED] お問い合わせページに移動するための新しいハンドラ
  // [ADDED] New handler to navigate to the contact page with quote data
  const handleGoToContact = () => {
    if (!isFormValid) return;

    const selectedFeatures = quoteData.features.map(featureKey => {
      const feature = featureOptions.find(f => f.value === featureKey);
      return feature ? `  - ${feature.label}` : '';
    }).join('\n');

    const designLabel = designOptions.find(d => d.value === quoteData.design)?.label || '';
    const timelineLabel = timelineOptions.find(t => t.value === quoteData.timeline)?.label || '';

    // Generate the message body
    const summary = `${t('quote.summary.header')}
${t('quote.summary.separator')}
■ ${t('quote.form.websiteType.label')}: ${t('quote.form.websiteType.options.corporate')}
■ ${t('quote.form.pageCount.label')}: ${quoteData.pageCount} ${t('quote.summary.pageLabel')}
■ ${t('quote.form.features.label')}:
${selectedFeatures || t('quote.summary.none')}
■ ${t('quote.form.design.label')}: ${designLabel}
■ ${t('quote.form.timeline.label')}: ${timelineLabel}
${t('quote.summary.separator')}
■ ${t('quote.result.title')}: ${t('quote.result.priceRange', { min: priceRange.min.toLocaleString(), max: priceRange.max.toLocaleString() })}
${t('quote.summary.separator')}

${t('quote.summary.footer')}
`;

    // Pass page change and quote data to parent component
    onPageChange('contact', {
      quoteSummary: summary,
      quoteSubject: t('quote.summary.subject')
    });
  };


  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#50FA7B]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3F87F5]/20 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#50FA7B] via-[#32E2C4] to-[#3F87F5] bg-clip-text text-transparent">
                {t('quote.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('quote.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Website Type */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">
                    {t('quote.form.websiteType.label')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {websiteTypeOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setQuoteData(prev => ({ ...prev, websiteType: option.value }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          quoteData.websiteType === option.value
                            ? 'border-[#50FA7B] bg-[#50FA7B]/10 text-white'
                            : 'border-gray-700 hover:border-gray-600 text-gray-300'
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Page Count */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">
                    {t('quote.form.pageCount.label')} ({quoteData.pageCount}ページ)
                  </label>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="1"
                        value={quoteData.pageCount}
                        onChange={(e) => setQuoteData(prev => ({ ...prev, pageCount: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #32E2C4 0%, #32E2C4 ${((quoteData.pageCount - 5) / 45) * 100}%, #374151 ${((quoteData.pageCount - 5) / 45) * 100}%, #374151 100%)`
                        }}
                      />
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>5ページ</span>
                        <span>50ページ</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <input
                        type="number"
                        min="5"
                        max="50"
                        value={quoteData.pageCount}
                        onChange={(e) => {
                          const value = Math.max(5, Math.min(50, parseInt(e.target.value) || 5));
                          setQuoteData(prev => ({ ...prev, pageCount: value }));
                        }}
                        className="w-24 p-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-center focus:outline-none focus:border-[#32E2C4]"
                      />
                      <span className="text-gray-400 text-sm">ページ</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">
                    {t('quote.form.features.label')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {featureOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleFeatureChange(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-2 ${
                          quoteData.features.includes(option.value)
                            ? 'border-[#3F87F5] bg-[#3F87F5]/10 text-white'
                            : 'border-gray-700 hover:border-gray-600 text-gray-300'
                        }`}
                      >
                        <CheckCircle className={`w-5 h-5 ${
                          quoteData.features.includes(option.value) ? 'text-[#3F87F5]' : 'text-gray-500'
                        }`} />
                        <span>{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Design Complexity */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">
                    {t('quote.form.design.label')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {designOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setQuoteData(prev => ({ ...prev, design: option.value }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          quoteData.design === option.value
                            ? 'border-[#50FA7B] bg-[#50FA7B]/10 text-white'
                            : 'border-gray-700 hover:border-gray-600 text-gray-300'
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-4">
                    {t('quote.form.timeline.label')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {timelineOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setQuoteData(prev => ({ ...prev, timeline: option.value }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          quoteData.timeline === option.value
                            ? 'border-[#32E2C4] bg-[#32E2C4]/10 text-white'
                            : 'border-gray-700 hover:border-gray-600 text-gray-300'
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time Result */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-r from-[#3F87F5]/10 to-[#32E2C4]/10 border border-[#3F87F5]/30 rounded-2xl p-6 sticky top-8">
                  <div className="flex items-center mb-6">
                    <Calculator className="w-6 h-6 text-[#50FA7B] mr-2" />
                    <h3 className="text-xl font-bold text-white">{t('quote.result.title')}</h3>
                  </div>

                  {isFormValid ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-[#50FA7B] mb-2">
                          ¥{priceRange.min.toLocaleString()} 〜 ¥{priceRange.max.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-400">{t('quote.result.note')}</p>
                      </div>

                      {/* [MODIFIED] ボタンのonClickを新しいハンドラに変更 */}
                      {/* [MODIFIED] Changed button's onClick to the new handler */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGoToContact}
                        className="w-full px-6 py-3 bg-[#50FA7B] text-black font-bold rounded-xl hover:bg-[#50FA7B]/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>{t('quote.result.contact_button')}</span>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">{t('quote.result.selectOptionsPrompt')}</p>
                      <div className="text-2xl font-bold text-gray-600">¥--- 〜 ¥---</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};