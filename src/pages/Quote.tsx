import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle, MessageSquare, FileCode } from 'lucide-react';

interface QuoteProps {
  onPageChange: (page: string, data?: any) => void;
}

// 新的数据结构
interface QuoteData {
  webPlan: string;
  pageCount: number;
  options: string[];
  maintenance: string[]; // 新增维护选项
  languages: string[];
  timeline: string;
  sourceCode: boolean;
}

// WEB制作プラン数据
const webPlans = [
  { id: 'template', nameKey: 'basic', pages: 3, price: 30000 },
  { id: 'standard-5', nameKey: 'standard5', pages: 5, price: 100000 },
  { id: 'standard-10', nameKey: 'standard10', pages: 10, price: 150000 },
  { id: 'customize', nameKey: 'customize', pages: 10, price: 180000 },
  { id: 'premium', nameKey: 'premium', pages: 10, price: 250000 },
];

// オプション料金データ
const optionItems = [
  { id: 'cms', nameKey: 'cms', price: 20000 },
  { id: 'mobile', nameKey: 'mobile', price: 20000 },
  { id: 'product', nameKey: 'product', price: 10000 },
  { id: 'news', nameKey: 'news', price: 10000 },
  { id: 'content', nameKey: 'content', price: 30000 },
  { id: 'contact', nameKey: 'contact', price: 9900 },
  { id: 'shop', nameKey: 'shop', price: 30000 },
  { id: 'blog', nameKey: 'blog', price: 11880 },
  { id: 'seo', nameKey: 'seo', price: 0 },
  { id: 'meo', nameKey: 'meo', price: 9000 },
  { id: 'recaptcha', nameKey: 'recaptcha', price: 10800 },
  { id: 'ssl', nameKey: 'ssl', price: 10800 },
];

// 维护选项数据
const maintenanceItems = [
  { id: 'email', nameKey: 'email', price: 900, unit: 'month' },
  { id: 'update', nameKey: 'update', price: 4990, unit: 'month' },
];

// 网站语言选项
const languageOptions = [
  { id: 'ja', nameKey: 'japanese' },
  { id: 'en', nameKey: 'english' },
  { id: 'zh', nameKey: 'chinese' },
  { id: 'ko', nameKey: 'korean' },
];

export const Quote = ({ onPageChange }: QuoteProps) => {
  const { t } = useTranslation();

  const [quoteData, setQuoteData] = useState<QuoteData>({
    webPlan: '',
    pageCount: 3,
    options: [],
    maintenance: [], // 默认不选择任何维护
    languages: [], // 默认不选择任何语言
    timeline: '', // 使用英文值：'rush', 'quick', 'normal', 'flexible'
    sourceCode: false,
  });

  const [showResult, setShowResult] = useState(false);
  const [pageInputValue, setPageInputValue] = useState('3'); // 独立的输入框状态

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 同步输入框值和页面数状态
  useEffect(() => {
    setPageInputValue(quoteData.pageCount.toString());
  }, [quoteData.pageCount]);

  // 当选择カスタマイズプラン/プレミアムプラン或ページ数变化时，自动清除无效的timeline选择
  useEffect(() => {
    let shouldClear = false;
    
    // 检查当前timeline是否应该被禁用
    if (quoteData.timeline === 'rush') {
      shouldClear = quoteData.pageCount > 5;
    } else if (quoteData.timeline === 'quick') {
      shouldClear = quoteData.pageCount > 10;
    } else if (quoteData.timeline === 'normal') {
      shouldClear = quoteData.pageCount > 17;
    }
    
    if (shouldClear) {
      setQuoteData(prev => ({ ...prev, timeline: '' }));
    }
  }, [quoteData.webPlan, quoteData.pageCount]);

  // 价格计算逻辑
  const calculatePrice = () => {
    const selectedPlan = webPlans.find(plan => plan.id === quoteData.webPlan);
    
    // 基础计划价格
    let basePrice = selectedPlan ? selectedPlan.price : 0;

    // 页面数超出费用计算（分段阶梯式计费）
    let pageExtraCost = 0;
    if (selectedPlan) {
      const extraPages = Math.max(0, quoteData.pageCount - selectedPlan.pages);
      
      if (extraPages > 0) {
        // 分段计算追加页面费用
        const planPages = selectedPlan.pages; // 计划自带页面数
        const totalPages = quoteData.pageCount; // 总页面数
        
        let cost = 0;
        let currentPage = planPages + 1; // 从计划页面+1开始计算
        
        for (let i = 0; i < extraPages; i++) {
          const pageNumber = currentPage + i;
          
          if (pageNumber <= 5) {
            // 1-5页: 每页 ¥9,900
            cost += 9900;
          } else if (pageNumber <= 15) {
            // 6-15页: 每页 ¥14,900
            cost += 14900;
          } else {
            // 16页以上: 每页 ¥19,900
            cost += 19900;
          }
        }
        
        pageExtraCost = cost;
      }
    }

    // オプション费用计算（不包含SSL）
    let optionCost = 0;
    let variableOptionCount = 0; // 起始价格选项的数量
    
    quoteData.options.forEach(optionId => {
      const option = optionItems.find(item => item.id === optionId);
      if (option && option.id !== 'ssl') { // 排除SSL选项
        // 检查是否为计划包含的选项，费用为0
        const isIncludedInPlan = 
          // SEO対策: 选择了任何计划时都包含
          (optionId === 'seo' && quoteData.webPlan) ||
          // CMS管理システム: スタンダード以上のプラン包含
          (optionId === 'cms' && (quoteData.webPlan === 'standard-5' || quoteData.webPlan === 'standard-10' || quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
          // お問い合わせフォーム: スタンダード以上のプラン包含
          (optionId === 'contact' && (quoteData.webPlan === 'standard-5' || quoteData.webPlan === 'standard-10' || quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
          // 商品展示機能: スタンダード以上のプラン包含
          (optionId === 'product' && (quoteData.webPlan === 'standard-5' || quoteData.webPlan === 'standard-10' || quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
          // スマホ対応: スタンダード以上のプラン包含
          (optionId === 'mobile' && (quoteData.webPlan === 'standard-5' || quoteData.webPlan === 'standard-10' || quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
          // ネットショップ機能: カスタマイズとプレミアム包含
          (optionId === 'shop' && (quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
          // MEO対策: プレミアムプランのみ包含
          (optionId === 'meo' && quoteData.webPlan === 'premium') ||
          // 原稿お任せ: プレミアムプランのみ包含
          (optionId === 'content' && quoteData.webPlan === 'premium');
        
        if (isIncludedInPlan) {
          optionCost += 0;
        } else {
          optionCost += option.price;
        }
        
        // 检查是否为起始价格选项（无论是否包含在计划中）
        // CMS管理システム和原稿お任せ即使被计划包含也参与浮动价格计算
        if (['cms', 'content'].includes(optionId) || 
            (!isIncludedInPlan && ['mobile', 'shop', 'blog'].includes(optionId))) {
          variableOptionCount++;
        }
      }
    });

    // 语言费用计算（选择数量大于1时，每多选一个+30%）
    const extraLanguages = Math.max(0, quoteData.languages.length - 1);
    const languageCost = extraLanguages > 0 ? (basePrice + pageExtraCost + optionCost) * (extraLanguages * 0.3) : 0;

    // 计算不含SSL的总价
    const totalWithoutSSL = basePrice + pageExtraCost + optionCost + languageCost;

    // SSL化费用计算（总价超过15万免费）
    let sslCost = 0;
    const isSSLFreeByAmount = totalWithoutSSL >= 150000;
    if (quoteData.options.includes('ssl')) {
      sslCost = isSSLFreeByAmount ? 0 : 10800;
    }

    // 维护费用计算（月度费用）
    let maintenanceCost = 0;
    quoteData.maintenance.forEach(maintenanceId => {
      const maintenance = maintenanceItems.find(item => item.id === maintenanceId);
      if (maintenance) {
        if (maintenance.unit === 'year') {
          maintenanceCost += Math.round(maintenance.price / 12); // 年费用除以12
        } else {
          maintenanceCost += maintenance.price; // 月费用直接加
        }
      }
    });
    maintenanceCost += 2400; // サーバー保守固定费用

    // 基础总价（包含SSL费用）
    const baseTotal = basePrice + pageExtraCost + optionCost + sslCost + languageCost;

    // 納期费用计算
    let finalPrice = baseTotal;
    let timelineCost = 0;
    if (quoteData.timeline === 'rush') {
      timelineCost = baseTotal * 0.4; // +40%
      finalPrice = baseTotal * 1.4;
    } else if (quoteData.timeline === 'quick' && quoteData.pageCount >= 6 && quoteData.pageCount <= 10) {
      timelineCost = baseTotal * 0.2; // +20%
      finalPrice = baseTotal * 1.2;
    } else if (quoteData.timeline === 'normal' && quoteData.pageCount >= 11 && quoteData.pageCount <= 17) {
      timelineCost = baseTotal * 0.2; // +20%
      finalPrice = baseTotal * 1.2;
    }

    // 计算价格范围（如果有起始价格选项）
    let finalPriceMax = finalPrice;
    if (variableOptionCount > 0) {
      // 每个起始价格选项增加20%
      const variableOptionIncrease = variableOptionCount * 0.2;
      finalPriceMax = finalPrice * (1 + variableOptionIncrease);
    }

    // ソースコード納品费用计算（最后单独计算，対総額+20%）
    let sourceCodeCost = 0;
    let sourceCodeCostMax = 0;
    let finalPriceWithSourceCode = finalPrice;
    let finalPriceMaxWithSourceCode = finalPriceMax;
    
    if (quoteData.sourceCode) {
      sourceCodeCost = finalPrice * 0.2; // 最低价的20%
      sourceCodeCostMax = finalPriceMax * 0.2; // 最高价的20%
      finalPriceWithSourceCode = finalPrice + sourceCodeCost;
      finalPriceMaxWithSourceCode = finalPriceMax + sourceCodeCostMax;
    }

         return {
      basePrice,
      pageExtraCost,
      optionCost: optionCost + sslCost, // 包含SSL费用
      sslCost, // SSL单独费用
      isSSLFreeByAmount, // 是否因为金额超15万而免费
      languageCost,
      maintenanceCost, // 新增维护费用（月度）
      timelineCost, // 納期加价费用
      sourceCodeCost, // 新增ソースコード納品费用
      websiteTotal: Math.round(finalPriceWithSourceCode), // 网站搭建总费用（含ソースコード納品，最低价）
      websiteTotalMax: Math.round(finalPriceMaxWithSourceCode), // 网站搭建总费用（含ソースコード納品，最高价）
      websiteTotalBeforeSourceCode: Math.round(finalPrice), // 网站搭建费用（不含ソースコード納品，最低价）
      websiteTotalMaxBeforeSourceCode: Math.round(finalPriceMax), // 网站搭建费用（不含ソースコード納品，最高价）
      maintenanceTotal: maintenanceCost, // 维护月费用
      total: Math.round(finalPriceWithSourceCode), // 保持兼容性（含ソースコード納品，最低价）
      totalMax: Math.round(finalPriceMaxWithSourceCode), // 最高价（含ソースコード納品）
      hasVariableOptions: variableOptionCount > 0 // 是否有起始价格选项
     };
  };

  const pricing = calculatePrice();

  const handleSubmit = () => {
    // 计算当前价格
    const currentPricing = calculatePrice();
    
    // 检查是否满足SSL免费条件且SSL未被勾选
    if (currentPricing.isSSLFreeByAmount && !quoteData.options.includes('ssl')) {
      // 自动勾选SSL化选项
      setQuoteData(prev => ({
        ...prev,
        options: [...prev.options, 'ssl']
      }));
    }
    
    setShowResult(true);
  };

  const handleContactSubmit = () => {
    // 传递见积数据到联系页面
    onPageChange('contact', {
      quoteData,
      pricing,
      source: 'quote'
    });
  };

  return (
    <div className="min-h-screen text-gray-900 pt-24" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e0f2fe 75%, #f0fdfa 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite'
    }}>
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {t('quote.hero.title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('quote.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Form Section */}
            <div>
          <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200"
              >
                                 {/* WEB制作プラン選択 */}
                 <div className="mb-6">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('quote.form.webPlan.title')}</h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                    {webPlans.map((plan, idx) => (
                      <>
                        {plan.id === 'customize' && <div className="col-span-full h-0" />}
                        <label
                          key={plan.id}
                          className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all min-w-0 ${
                            quoteData.webPlan === plan.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                                                 <input
                           type="radio"
                           name="webPlan"
                           value={plan.id}
                           checked={quoteData.webPlan === plan.id}
                           onChange={(e) => {
                             // 如果点击的是已选中的项目，则取消选择
                             if (quoteData.webPlan === plan.id) {
                               // 取消选择时，移除相应的自动勾选项目
                               if (plan.id === 'template') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   pageCount: 3,
                                   options: quoteData.options.filter(id => id !== 'seo')
                                 });
                               } else if (plan.id === 'standard-5' || plan.id === 'standard-10') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   pageCount: 3,
                                   options: quoteData.options.filter(id => !['cms', 'contact', 'product', 'mobile', 'seo'].includes(id))
                                 });
                               } else if (plan.id === 'customize') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   pageCount: 3,
                                   options: quoteData.options.filter(id => !['cms', 'contact', 'product', 'mobile', 'shop', 'seo'].includes(id))
                                 });
                               } else if (plan.id === 'premium') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   pageCount: 3,
                                   options: quoteData.options.filter(id => !['cms', 'contact', 'product', 'mobile', 'shop', 'meo', 'content', 'seo'].includes(id))
                                 });
                               }
                             } else {
                               // 选择新的计划
                               if (plan.id === 'template') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: plan.id,
                                   pageCount: 3,
                                   options: ['seo'] // 只保留 SEO対策
                                 });
                               } else if (plan.id === 'standard-5') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: plan.id,
                                   pageCount: 5,
                                   options: ['cms', 'contact', 'product', 'mobile', 'seo']
                                 });
                               } else if (plan.id === 'standard-10') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: plan.id,
                                   pageCount: 10,
                                   options: ['cms', 'contact', 'product', 'mobile', 'seo']
                                 });
                               } else if (plan.id === 'customize') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: plan.id,
                                   pageCount: 10,
                                   options: ['cms', 'contact', 'product', 'mobile', 'shop', 'seo']
                                 });
                               } else if (plan.id === 'premium') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: plan.id,
                                   pageCount: 10,
                                   options: ['cms', 'contact', 'product', 'mobile', 'shop', 'meo', 'content', 'seo']
                                 });
                               }
                             }
                           }}
                           onClick={(e) => {
                             // 处理点击事件以支持取消选择
                             if (quoteData.webPlan === plan.id) {
                               e.preventDefault();
                               // 取消选择时，移除相应的自动勾选项目
                               if (plan.id === 'template') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   options: quoteData.options.filter(id => id !== 'seo')
                                 });
                               } else if (plan.id === 'basic-5' || plan.id === 'basic-10') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   options: quoteData.options.filter(id => id !== 'cms' && id !== 'contact' && id !== 'product' && id !== 'seo')
                                 });
                               } else if (plan.id === 'standard-5' || plan.id === 'standard-10') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   options: quoteData.options.filter(id => id !== 'cms' && id !== 'contact' && id !== 'product' && id !== 'mobile' && id !== 'seo')
                                 });
                               } else if (plan.id === 'customize') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   options: quoteData.options.filter(id => id !== 'cms' && id !== 'contact' && id !== 'product' && id !== 'mobile' && id !== 'shop' && id !== 'seo')
                                 });
                               } else if (plan.id === 'premium') {
                                 setQuoteData({ 
                                   ...quoteData, 
                                   webPlan: '',
                                   options: quoteData.options.filter(id => id !== 'cms' && id !== 'contact' && id !== 'product' && id !== 'mobile' && id !== 'shop' && id !== 'meo' && id !== 'content' && id !== 'seo')
                                 });
                               } else {
                                 setQuoteData({ ...quoteData, webPlan: '' });
                               }
                             }
                           }}
                           className="sr-only"
                         />
                                                 <div className="flex-1 min-w-0 overflow-hidden">
                           <div className="text-center">
                             <div className={`font-bold text-base leading-tight truncate ${
                               quoteData.webPlan === plan.id ? 'text-blue-700' : 'text-gray-900'
                             }`}>{t(`quote.form.webPlan.${plan.nameKey}`)}</div>
                             <div className={`text-sm mt-1 truncate ${
                               quoteData.webPlan === plan.id ? 'text-blue-600' : 'text-gray-600'
                             }`}>
                               {plan.pages}{t('quote.form.webPlan.pages')}
                             </div>
                             <div className={`text-sm font-semibold truncate ${
                               quoteData.webPlan === plan.id ? 'text-blue-800' : 'text-blue-600'
                             }`}>
                               {t('quote.form.webPlan.price', { price: plan.price.toLocaleString() })}
                             </div>
                           </div>
                         </div>
                        {quoteData.webPlan === plan.id && (
                          <CheckCircle className="w-5 h-5 text-blue-500 ml-2" />
                        )}
                      </label>
                    </>
                  ))}
                  </div>
                </div>

                                 {/* ページ数選択 */}
                 <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t('quote.form.pageCount.title')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t('quote.form.pageCount.min')}</span>
                      <span className="text-gray-600">{t('quote.form.pageCount.max')}</span>
                    </div>
                      <input
                        type="range"
                      min="3"
                        max="50"
                        value={quoteData.pageCount}
                      onChange={(e) => setQuoteData({ ...quoteData, pageCount: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${((quoteData.pageCount - 3) / 47) * 100}%, #e5e7eb ${((quoteData.pageCount - 3) / 47) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="text-center">
                      <span className="inline-block bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                        {quoteData.pageCount}{t('quote.form.pageCount.pages')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <label className="text-sm text-gray-600">{t('quote.form.pageCount.directInput')}</label>
                      <input
                        type="text"
                        value={pageInputValue}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // 只允许数字输入
                          if (inputValue === '' || /^\d+$/.test(inputValue)) {
                            setPageInputValue(inputValue);
                            // 如果输入的是有效数字且在范围内，立即更新状态
                            if (inputValue !== '') {
                              const value = parseInt(inputValue);
                              if (!isNaN(value) && value >= 3 && value <= 50) {
                                setQuoteData({ ...quoteData, pageCount: value });
                              }
                            }
                          }
                        }}
                        onBlur={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === '' || isNaN(parseInt(inputValue))) {
                            // 如果输入为空或无效，重置为3
                            setPageInputValue('3');
                            setQuoteData({ ...quoteData, pageCount: 3 });
                          } else {
                            const value = parseInt(inputValue);
                            if (value < 3) {
                              setPageInputValue('3');
                              setQuoteData({ ...quoteData, pageCount: 3 });
                            } else if (value > 50) {
                              setPageInputValue('50');
                              setQuoteData({ ...quoteData, pageCount: 50 });
                            }
                          }
                        }}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3-50"
                      />
                      <span className="text-sm text-gray-600">{t('quote.form.pageCount.pages')}</span>
                    </div>
                  </div>
                </div>

                                 {/* オプション選択 */}
                 <div className="mb-6">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('quote.form.options.title')}</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {optionItems.map((option) => {
                                             // 使用与价格计算相同的逻辑判断是否为计划包含的选项
                       const isPlanIncluded = 
                         // SEO対策: 选择了任何计划时都包含
                         (option.id === 'seo' && quoteData.webPlan) ||
                        // CMS管理システム: スタンダード以上のプラン包含
                        (option.id === 'cms' && (quoteData.webPlan === 'standard-5' || quoteData.webPlan === 'standard-10' || quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
                        // お問い合わせフォーム: スタンダード以上のプラン包含
                        (option.id === 'contact' && (quoteData.webPlan === 'standard-5' || quoteData.webPlan === 'standard-10' || quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
                        // 商品展示機能: スタンダード以上のプラン包含
                        (option.id === 'product' && (quoteData.webPlan === 'standard-5' || quoteData.webPlan === 'standard-10' || quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
                        // スマホ対応: スタンダード以上のプラン包含
                        (option.id === 'mobile' && (quoteData.webPlan === 'standard-5' || quoteData.webPlan === 'standard-10' || quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
                        // ネットショップ機能: カスタマイズとプレミアム包含
                        (option.id === 'shop' && (quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium')) ||
                        // MEO対策: プレミアムプランのみ包含
                        (option.id === 'meo' && quoteData.webPlan === 'premium') ||
                        // 原稿お任せ: プレミアムプランのみ包含
                        (option.id === 'content' && quoteData.webPlan === 'premium');
                     
                     // SSL化特殊逻辑：检查是否因为金额超15万而免费（仅用于显示文本）
                     const pricing = calculatePrice();
                     const isSSLFreeByAmount: boolean = option.id === 'ssl' && Boolean(pricing.isSSLFreeByAmount);
                     
                     // plan包含的选项显示为绿色免费状态
                     const isFreeOption: boolean = Boolean(isPlanIncluded);
                     
                     // 正常的勾选逻辑，不包含自动勾选
                     const isChecked: boolean = quoteData.options.includes(option.id);
                      
                      return (
                        <label
                          key={option.id}
                          className={`relative flex items-center p-4 border-2 rounded-lg transition-all ${
                            isFreeOption 
                              ? 'border-green-500 bg-green-50 cursor-default'
                              : (isSSLFreeByAmount && isChecked)
                                ? 'border-blue-500 bg-blue-50 cursor-pointer'
                                : isChecked
                                  ? 'border-blue-500 bg-blue-50 cursor-pointer'
                                  : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              // 如果是plan包含的选项，阻止取消勾选
                              if (isFreeOption && !e.target.checked) {
                                return;
                              }
                              
                              if (e.target.checked) {
                                setQuoteData({
                                  ...quoteData,
                                  options: [...quoteData.options, option.id]
                                });
                              } else {
                                setQuoteData({
                                  ...quoteData,
                                  options: quoteData.options.filter(id => id !== option.id)
                                });
                              }
                            }}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">
                              {t(`quote.form.options.${option.nameKey}`)}
                              {isPlanIncluded && (
                                <span className="text-xs text-green-600 ml-1">{t('quote.form.options.planIncluded')}</span>
                              )}
                              {isSSLFreeByAmount && (
                                <span className="text-xs text-green-600 ml-1">{t('quote.form.options.over150k')}</span>
                              )}
                            </span>
                            <div className="text-sm text-gray-600 mt-1">
                              {isPlanIncluded 
                                ? t('quote.form.options.freePlanIncluded')
                                : option.price === 0 
                                  ? t('quote.form.options.free')
                                  : isSSLFreeByAmount 
                                    ? t('quote.form.options.freeOver150k')
                                    : (['cms', 'mobile', 'content', 'shop', 'blog'].includes(option.id) 
                                        ? t('quote.form.options.variablePrice', { price: option.price.toLocaleString() })
                                        : t('quote.form.options.fixedPrice', { price: option.price.toLocaleString() }))
                              }
                            </div>
                          </div>
                          {isChecked && (
                            <CheckCircle className={`w-5 h-5 ml-2 ${
                              isFreeOption ? 'text-green-500' : 'text-blue-500'
                        }`} />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>

                                 {/* 保守 */}
                 <div className="mb-6">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('quote.form.maintenance.title')}</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {maintenanceItems.map((maintenance) => (
                      <label
                        key={maintenance.id}
                        className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          quoteData.maintenance.includes(maintenance.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={quoteData.maintenance.includes(maintenance.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setQuoteData({
                                ...quoteData,
                                maintenance: [...quoteData.maintenance, maintenance.id]
                              });
                            } else {
                              setQuoteData({
                                ...quoteData,
                                maintenance: quoteData.maintenance.filter(id => id !== maintenance.id)
                              });
                            }
                          }}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <span className="font-medium text-gray-900">{t(`quote.form.maintenance.${maintenance.nameKey}`)}</span>
                          <div className="text-sm text-gray-600 mt-1">
                            ¥{maintenance.price.toLocaleString()}/{maintenance.unit === 'year' ? t('quote.form.maintenance.year') : t('quote.form.maintenance.month')}
                          </div>
                        </div>
                        {quoteData.maintenance.includes(maintenance.id) && (
                          <CheckCircle className="w-5 h-5 text-green-500 absolute top-2 right-2" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                 {/* 希望納期 */}
                 <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('quote.form.timeline.title')}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                    <label
                      className={`relative flex items-center p-4 border-2 rounded-lg transition-all ${
                        quoteData.timeline === 'rush'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${
                        (quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium' || quoteData.pageCount > 5)
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      }`}
                      onClick={(e) => {
                        // 如果已经选中，则取消选择
                        if (quoteData.timeline === 'rush' && !(quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium' || quoteData.pageCount > 5)) {
                          e.preventDefault();
                          setQuoteData({ ...quoteData, timeline: '' });
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value="rush"
                        checked={quoteData.timeline === 'rush'}
                        onChange={(e) => {
                          if (!(quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium' || quoteData.pageCount > 5)) {
                            setQuoteData({ ...quoteData, timeline: e.target.value });
                          }
                        }}
                        disabled={quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium' || quoteData.pageCount > 5}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{t('quote.form.timeline.rush')}</div>
                        <div className="text-sm text-red-600">{t('quote.form.timeline.rushFee')}</div>
                      </div>
                    </label>
                    <label
                      className={`relative flex items-center p-4 border-2 rounded-lg transition-all ${
                        quoteData.timeline === 'quick'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${
                        (quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium' || quoteData.pageCount > 10)
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      }`}
                      onClick={(e) => {
                        // 如果已经选中，则取消选择
                        if (quoteData.timeline === 'quick' && !(quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium' || quoteData.pageCount > 10)) {
                          e.preventDefault();
                          setQuoteData({ ...quoteData, timeline: '' });
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value="quick"
                        checked={quoteData.timeline === 'quick'}
                        onChange={(e) => {
                          if (!(quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium' || quoteData.pageCount > 10)) {
                            setQuoteData({ ...quoteData, timeline: e.target.value });
                          }
                        }}
                        disabled={quoteData.webPlan === 'customize' || quoteData.webPlan === 'premium' || quoteData.pageCount > 10}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{t('quote.form.timeline.quick')}</div>
                        {quoteData.pageCount >= 6 && quoteData.pageCount <= 10 && (
                          <div className="text-sm text-red-600">{t('quote.form.timeline.quickFee')}</div>
                        )}
                      </div>
                    </label>
                    <label
                      className={`relative flex items-center p-4 border-2 rounded-lg transition-all ${
                        quoteData.timeline === 'normal'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${
                        quoteData.pageCount > 17
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      }`}
                      onClick={(e) => {
                        // 如果已经选中，则取消选择
                        if (quoteData.timeline === 'normal' && quoteData.pageCount <= 17) {
                          e.preventDefault();
                          setQuoteData({ ...quoteData, timeline: '' });
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value="normal"
                        checked={quoteData.timeline === 'normal'}
                        onChange={(e) => {
                          if (quoteData.pageCount <= 17) {
                            setQuoteData({ ...quoteData, timeline: e.target.value });
                          }
                        }}
                        disabled={quoteData.pageCount > 17}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{t('quote.form.timeline.normal')}</div>
                        {quoteData.pageCount >= 11 && quoteData.pageCount <= 17 && (
                          <div className="text-sm text-red-600">{t('quote.form.timeline.normalFee')}</div>
                        )}
                      </div>
                    </label>
                    <label
                      className={`relative flex items-center p-4 border-2 rounded-lg transition-all ${
                        quoteData.timeline === 'flexible'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } cursor-pointer`}
                      onClick={(e) => {
                        // 如果已经选中，则取消选择
                        if (quoteData.timeline === 'flexible') {
                          e.preventDefault();
                          setQuoteData({ ...quoteData, timeline: '' });
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value="flexible"
                        checked={quoteData.timeline === 'flexible'}
                        onChange={(e) => setQuoteData({ ...quoteData, timeline: e.target.value })}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{t('quote.form.timeline.flexible')}</div>
                      </div>
                    </label>
                  </div>
                </div>

                 {/* 网站语言选择 */}
                 <div className="mb-6">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('quote.form.languages.title')}</h3>
                   <div className="space-y-3">
                     {languageOptions.map((language) => (
                       <label
                         key={language.id}
                         className="flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                       >
                    <input
                      type="checkbox"
                           checked={quoteData.languages.includes(language.id)}
                           onChange={(e) => {
                             if (e.target.checked) {
                               setQuoteData({
                                 ...quoteData,
                                 languages: [...quoteData.languages, language.id]
                               });
                             } else {
                               setQuoteData({
                                 ...quoteData,
                                 languages: quoteData.languages.filter(id => id !== language.id)
                               });
                             }
                           }}
                           className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                         />
                         <div className="flex-1">
                           <span className="font-medium text-gray-900">{t(`quote.form.languages.${language.nameKey}`)}</span>
                           {quoteData.languages.includes(language.id) && quoteData.languages.length > 1 && quoteData.languages.indexOf(language.id) > 0 && (
                               <span className="text-sm text-blue-600 ml-2">{t('quote.form.languages.extraFee')}</span>
                           )}
                         </div>
                    </label>
                     ))}
                     <div className="text-sm text-gray-500 mt-2">
                       {t('quote.form.languages.note')}
                     </div>
                   </div>
                 </div>

                 {/* ソースコード納品 */}
                 <div className="mb-6">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('quote.form.sourceCode.title')}</h3>
                   <div className="grid grid-cols-1 gap-3">
                     <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                       quoteData.sourceCode
                         ? 'border-blue-500 bg-blue-50'
                         : 'border-gray-200 hover:border-gray-300'
                     }`}>
                       <input
                         type="checkbox"
                         checked={quoteData.sourceCode}
                         onChange={(e) => {
                           setQuoteData({ ...quoteData, sourceCode: e.target.checked });
                         }}
                         className="sr-only"
                       />
                       <div className="flex-1">
                         <span className="font-medium text-gray-900">
                           {t('quote.form.sourceCode.name')}
                         </span>
                         <div className="text-sm text-gray-600 mt-1">
                           {t('quote.form.sourceCode.fee')}
                         </div>
                         <div className="text-xs text-gray-500 mt-1">
                           {t('quote.form.sourceCode.description')}
                         </div>
                       </div>
                       {quoteData.sourceCode && (
                         <CheckCircle className="w-5 h-5 text-blue-500 ml-2" />
                       )}
                     </label>
                   </div>
                 </div>

                 {/* Submit Button */}
                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={!quoteData.webPlan || !quoteData.timeline || quoteData.languages.length === 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Calculator className="w-5 h-5" />
                    <span>{t('quote.form.calculate')}</span>
                  </motion.button>
                  {(!quoteData.webPlan || !quoteData.timeline || quoteData.languages.length === 0) && (
                    <div className="mt-2 text-sm text-red-600 text-center">
                      {!quoteData.webPlan && (
                        <div>{t('quote.form.validation.selectPlan')}</div>
                      )}
                      {quoteData.webPlan && !quoteData.timeline && quoteData.languages.length === 0 && (
                        <div>{t('quote.form.validation.selectTimelineAndLanguage')}</div>
                      )}
                      {quoteData.webPlan && !quoteData.timeline && quoteData.languages.length > 0 && (
                        <div>{t('quote.form.validation.selectTimeline')}</div>
                      )}
                      {quoteData.webPlan && quoteData.timeline && quoteData.languages.length === 0 && (
                        <div>{t('quote.form.validation.selectLanguage')}</div>
                      )}
                  </div>
                  )}
                </div>
              </motion.div>
              </div>

                         {/* Results Section */}
             <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center justify-center mb-6">
                    <Calculator className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">{t('quote.result.title')}</h3>
                  </div>

                  {showResult && quoteData.timeline && quoteData.languages.length > 0 ? (
                    <div className="space-y-6">
                      {/* 两个卡片的容器 */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 网站搭建费用部分 */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="text-lg font-bold text-blue-600 mb-3">{t('quote.result.websiteCost')}</h4>
                          <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-blue-600">
                              {pricing.hasVariableOptions 
                                ? `¥${pricing.websiteTotal.toLocaleString()} ~ ¥${pricing.websiteTotalMax.toLocaleString()}`
                                : `¥${pricing.websiteTotal.toLocaleString()}`
                              }
                            </div>
                            <p className="text-sm text-gray-600">{t('quote.result.initialCost')}</p>
                            {pricing.hasVariableOptions && (
                              <p className="text-xs text-amber-600 mt-1">
                                {t('quote.result.variableNote')}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2 text-sm">
                            {/* 基本プラン */}
                            {pricing.basePrice > 0 && (
                              <div className="flex justify-between">
                                <span>{t('quote.result.basePlan')}</span>
                                <span>¥{pricing.basePrice.toLocaleString()}</span>
                              </div>
                            )}

                            {/* 追加ページ */}
                            {pricing.pageExtraCost > 0 && (
                              <div className="flex justify-between">
                                <span>{t('quote.result.extraPages')}</span>
                                <span>¥{pricing.pageExtraCost.toLocaleString()}</span>
                              </div>
                            )}

                            {/* オプション */}
                            {pricing.optionCost > 0 && (
                              <div className="flex justify-between">
                                <span>{t('quote.result.options')}</span>
                                <span>¥{pricing.optionCost.toLocaleString()}</span>
                              </div>
                            )}

                            {/* 多言語対応 */}
                            {pricing.languageCost > 0 && (
                              <div className="flex justify-between">
                                <span>{t('quote.result.multilingual')}</span>
                                <span>¥{pricing.languageCost.toLocaleString()}</span>
                              </div>
                            )}

                            {/* 納期加速料金 */}
                            {pricing.timelineCost > 0 && (
                              <div className="flex justify-between">
                                <span>
                                  {t('quote.result.timelineFee', { 
                                    percentage: quoteData.timeline === 'rush' ? '+40%' : '+20%' 
                                  })}
                                </span>
                                <span>¥{pricing.timelineCost.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                          {pricing.sourceCodeCost > 0 && (
                            <div className="flex justify-between border-t pt-2 mt-2">
                              <span className="font-medium">{t('quote.result.sourceCodeDelivery')}</span>
                              <span className="font-medium">
                                {pricing.hasVariableOptions 
                                  ? `¥${pricing.sourceCodeCost.toLocaleString()} ~ ¥${Math.round(pricing.websiteTotalMaxBeforeSourceCode * 0.2).toLocaleString()}`
                                  : `¥${pricing.sourceCodeCost.toLocaleString()}`
                                }
                              </span>
                            </div>
                          )}
                        </div>

                        {/* 维护费用部分 */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h4 className="text-lg font-bold text-green-600 mb-3">{t('quote.result.maintenanceCost')}</h4>
                          <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-green-600">
                              ¥{pricing.maintenanceTotal.toLocaleString()}/月
                            </div>
                            <p className="text-sm text-gray-600">{t('quote.result.monthlyCost')}</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>{t('quote.result.serverMaintenance')}</span>
                              <span>¥2,400/{t('quote.form.maintenance.month')}</span>
                            </div>
                            {quoteData.maintenance.map(maintenanceId => {
                              const maintenance = maintenanceItems.find(item => item.id === maintenanceId);
                              if (!maintenance) return null;
                              const monthlyPrice = maintenance.unit === 'year' ? Math.round(maintenance.price / 12) : maintenance.price;
                              return (
                                <div key={maintenanceId} className="flex justify-between">
                                  <span>
                                    {t(`quote.form.maintenance.${maintenance.nameKey}`)}
                                    {maintenance.id === 'email' && (
                                      <span className="text-green-600 ml-1">
                                        {t('quote.result.emailFirstYearFree')}
                                      </span>
                                    )}
                                  </span>
                                  <span>¥{monthlyPrice.toLocaleString()}/{t('quote.form.maintenance.month')}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* お問い合わせ按钮 - 在两个卡片下方居中 */}
                      <div className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleContactSubmit}
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{t('quote.result.contact')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <p>{t('quote.result.selectPrompt')}</p>
                      <div className="text-2xl font-bold text-gray-400 mt-4">¥--- ~ ¥---</div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};