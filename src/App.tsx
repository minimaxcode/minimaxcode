import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

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

import { StagewiseToolbar } from '@stagewise/toolbar-react';
import ReactPlugin from '@stagewise-plugins/react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [quoteDetailsForContact, setQuoteDetailsForContact] = useState(null);

  const currentPage = location.pathname.substring(1) || 'home';

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-S5F5M4ZVB3', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  const handlePageChange = (page: string, data: any = null) => {
    setQuoteDetailsForContact(data);
    navigate(`/${page === 'home' ? '' : page}`);
    window.scrollTo(0, 0);
  };

  const pageProps = { onPageChange: handlePageChange };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      <main>
        <Routes>
          <Route path="/" element={<Home {...pageProps} />} />
          <Route path="/works" element={<Works {...pageProps} />} />
          <Route path="/pricing" element={<Pricing {...pageProps} />} />
          <Route path="/flow" element={<Flow {...pageProps} />} />
          <Route path="/about" element={<About {...pageProps} />} />
          <Route path="/quote" element={<Quote {...pageProps} />} />
          <Route path="/contact" element={<Contact {...pageProps} quoteDetails={quoteDetailsForContact} />} />
          <Route path="/privacy" element={<Privacy {...pageProps} />} />
          <Route path="/terms" element={<Terms {...pageProps} />} />
          <Route path="*" element={<Home {...pageProps} />} /> {/* Fallback route */}
        </Routes>
      </main>
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

export default App;