import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface PricingProps {
  onPageChange: (page: string) => void;
}

const features = [
  { key: 'cms', label: 'CMS管理システム' },
  { key: 'mobile', label: 'スマホ対応' },
  { key: 'pages', label: 'ページ数' },
  { key: 'contact', label: 'お問合せ機能' },
  { key: 'product', label: '商品展示機能' },
  { key: 'shop', label: 'ネットショップ機能' },
  { key: 'meo', label: 'MEO対策' },
  { key: 'content', label: '原稿お任せ' },
  { key: 'seo', label: 'SEO対策' },
  { key: 'ssl', label: 'SSL化' },
  { key: 'period', label: '制作期間' },
  { key: 'feature', label: '特徴' },
  { key: 'price', label: '料金' },
];

export const Pricing = ({ onPageChange }: PricingProps) => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('pricing.basicPlan'),
      tag: '業界最安!',
      color: 'teal',
      price: { old: '40,000', current: '30,000' },
      pages: '1P~3P',
      cms: '-',
      mobile: '-',
      contact: '-',
      product: '-',
      shop: '-',
      meo: '-',
      content: '-',
      seo: '無料',
      ssl: '-',
      period: '7営業日',
      feature: '最低限必要なページ数で初期費用を抑える',
    },
    {
      name: 'スタンダードプラン',
      tag: '人気No.1',
      color: 'teal',
      price: { old: '200,000', current: '100,000/150,000' },
      pages: '~5P / ~10P',
      cms: '〇',
      mobile: '〇',
      contact: '〇',
      product: '〇',
      shop: '-',
      meo: '-',
      content: '-',
      seo: '無料',
      ssl: '無料',
      period: '14営業日',
      feature: '会社案内のように活用',
    },
    {
      name: 'カスタマイズプラン',
      tag: 'ビジネス',
      color: 'orange',
      price: { old: '250,000', current: '180,000~' },
      pages: '10P~',
      cms: '〇',
      mobile: '〇',
      contact: '〇',
      product: '〇',
      shop: '〇',
      meo: '-',
      content: '-',
      seo: '無料',
      ssl: '無料',
      period: '20営業日~',
      feature: 'オリジナルデザイン・営業マン活用',
    },
    {
      name: 'プレミアムプラン',
      tag: '',
      color: 'violet',
      price: { old: '373,000', current: '250,000~' },
      pages: '10P~',
      cms: '〇',
      mobile: '〇',
      contact: '〇',
      product: '〇',
      shop: '〇',
      meo: '〇',
      content: '〇',
      seo: '無料',
      ssl: '無料',
      period: '20営業日~',
      feature: '原稿もお任せ',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                料金プラン
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              お客様のニーズに合わせた最適なプランをご提案いたします
            </p>
          </motion.div>
        </div>
      </section>

      {/* WEB制作プラン料金表 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              WEB制作プラン料金表
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              表示金額は税込です
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-900 border-b border-r-2 border-gray-300 w-52 whitespace-nowrap">項目</th>
                  {plans.map((plan, idx) => (
                    <th
                      key={plan.name}
                      className={`px-4 py-3 text-sm font-semibold border-b w-52
                        ${idx === 1 ? ' border-l-2 border-gray-200 border-r-2 border-gray-200' : ''}
                        ${idx === 2 ? ' border-l-2 border-gray-300 border-r-2 border-gray-300' : ''}
                        ${idx > 2 ? ' border-l-2 border-gray-200' : ''}
                      `}
                    >
                      <div className={`font-bold ${idx === 0 ? 'text-blue-600' : `text-${plan.color}-700`}`}>{plan.name}</div>
                      {plan.tag && <div className={`inline-block mt-1 text-xs rounded-full px-2 py-0.5 ${idx === 0 ? 'bg-blue-100 text-blue-800' : `bg-${plan.color}-100 text-${plan.color}-800`}`}>{plan.tag}</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((feature) => (
                  <tr key={feature.key}>
                    <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 border-r-2 border-gray-300 w-52">{feature.label}</td>
                    {plans.map((plan, idx) => (
                      <td
                        key={plan.name + feature.key}
                        className={`px-4 py-3 w-52
                          ${idx === 1 ? ' border-l-2 border-gray-200 border-r-2 border-gray-200' : ''}
                          ${idx === 2 ? ' border-l-2 border-gray-300 border-r-2 border-gray-300' : ''}
                          ${idx > 2 ? ' border-l-2 border-gray-200' : ''}
                        `}
                      >
                        {feature.key === 'price' ? (
                          <span className="block">
                            <span className="line-through text-gray-400 mr-1">{plan.price.old}</span>
                            <br />
                            <span className={`text-lg font-bold ${idx === 0 ? 'text-blue-600' : `text-${plan.color}-600`}`}>{plan.price.current}</span>円
                          </span>
                        ) : (
                          typeof plan[feature.key as keyof typeof plan] === 'string' ? (plan[feature.key as keyof typeof plan] as string) : '-'
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-4 text-left">
              <p>※ 制作期間は営業日換算、資料受領・要件確認後に開始します。追加資料・デザインは別途料金。</p>
              <p>※ 画像・テキスト素材は原則ご提供いただきます。著作権等ご注意ください。</p>
              <p>※ ご要望・追加機能は別途お見積りとなります。</p>
            </div>
          </div>
        </div>
      </section>

      {/* オプション料金 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              オプション料金
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              サイトの機能追加や運用サポートなど、各種オプションもご用意しています。
            </p>
          </motion.div>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-900 border-b w-80 whitespace-nowrap">項目</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-900 border-b w-[400px] border-l-2 border-gray-200">単価</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-900 border-b w-[600px] border-l-2 border-gray-200">説明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">

                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">CMS管理システム</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥20,000~</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">お客様は自分自身でホームページを更新できます</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">スマホ対応</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥20,000~</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">モバイル最適化</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">商品展示機能</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥10,000</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">商品、人物、物件などを展示</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">情報掲示機能</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥10,000</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">最新情報、求人情報、お知らせなどを掲載</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">原稿お任せ</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥30,000~</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">テキストはこちらで作成いたします</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">お問い合わせフォーム</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥9,900</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">Googleフォーム等利用</td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">ネットショップ機能</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥30,000~</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">オンライン決済機能搭載</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">ブログ機能</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥11,880~</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">SEO対策付き、カテゴリ管理機能</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">SEO対策</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">無料</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">Google検索エンジン最適化、メタタグ設定</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">MEO対策</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥9,000</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">Googleマップ登録・マイビジネス設定・最適化</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">reCAPTCHA導入</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥10,800</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">スパムメール対策、セキュリティ強化</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">SSL化</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥10,800</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">セキュリティ証明書、15万円コースから無料</td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">サーバー保守</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥2,400/月</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">HP利用の月額費用</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">ドメイン</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">管理会社提示価格</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">.comドメイン永久無料キャンペーン中</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">企業メール</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥900/月</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">1年間無料体験キャンペーン中</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">サイト更新</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">¥4,990~/月</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">内容まるっ投げ、お任せ更新、レスポンシブ対応</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">多言語化</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">制作費+30%/1言語</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">多言語バージョン作成</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">ソースコード納品</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">総額の+20%</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">所有権を完全にお客様に譲渡</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-700 text-left bg-gray-50 w-80">その他の機能</td>
                  <td className="px-4 py-3 w-[400px] border-l-2 border-gray-200">ご相談</td>
                  <td className="px-4 py-3 w-[600px] border-l-2 border-gray-200">ご要望に応じてカスタマイズ対応</td>
                </tr>
              </tbody>
            </table>
            <div className="text-xs text-gray-500 mt-4 text-left">
              <p>※ 制作期間は営業日換算、資料の受領および要求の確認後に計算を開始します。</p>
              <p>※ デザイン・画像・テキスト素材は原則弊社が提供します。著作権等ご注意ください。</p>
              <p>※ ご要望・追加機能は別途お見積りとなります。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
