import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Service } from './pages/Service';
import { Pricing } from './pages/Pricing';
import { Flow } from './pages/Flow';
import { About } from './pages/About';
import { Quote } from './pages/Quote';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Works } from './pages/Works';

// TypeScript a window objectにgtagが存在することを知らせる
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: { page_path?: string }
    ) => void;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // [修正点 1] QuoteページからContactページへデータを渡すための中継用Stateを追加
  const [quoteDetailsForContact, setQuoteDetailsForContact] = useState(null);

  // Google Analytics page view tracking
  useEffect(() => {
    if (window.gtag) {
      const pagePath = `/${currentPage === 'home' ? '' : currentPage}`;
      window.gtag('config', 'G-S5F5M4ZVB3', {
        page_path: pagePath,
      });
    }
  }, [currentPage]);

  // [修正点 2] handlePageChange関数が、オプションでデータ(data)を受け取れるように変更
  const handlePageChange = (page: string, data: any = null) => {
    // 渡されたデータ（なければnull）を常にStateにセットする
    // これにより、Quoteページから遷移した時だけデータがセットされ、
    // 他のページからContactに遷移した場合はnullになり、フォームは空になる
    setQuoteDetailsForContact(data);
    
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    // onPageChangeは更新されたものを渡すので、pagePropsの定義は変更なし
    const pageProps = { onPageChange: handlePageChange };

    switch (currentPage) {
      case 'home':
        return <Home {...pageProps} />;
      case 'service':
        return <Service {...pageProps} />;
      case 'pricing':
        return <Pricing {...pageProps} />;
      case 'flow':
        return <Flow {...pageProps} />;
      case 'about':
        return <About {...pageProps} />;
      case 'quote':
        return <Quote {...pageProps} />;
      case 'contact':
        // [修正点 3] Contactコンポーネントをレンダリングする際に、保持していた見積もりデータをpropsとして渡す
        return <Contact {...pageProps} quoteDetails={quoteDetailsForContact} />;
      case 'privacy':
        return <Privacy {...pageProps} />;
      case 'terms':
        return <Terms {...pageProps} />;
      case 'works':
        return <Works {...pageProps} />;
      default:
        return <Home {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main>{renderPage()}</main>
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

export default App;