import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '@/components/Footer/index.jsx';
import Header from '@/components/Header/index.jsx';
import { LanguageContext } from '@/contexts/languageContext.js';
import useLanguage from '@/hooks/useLanguage.js';
import '@/index.css';
import ArticleDetail from '@/pages/ArticleDetail.jsx';
import Home from '@/pages/Home.jsx';
import Search from '@/pages/Search.jsx';
import { SEOWidget, WidgetsProvider } from '@sitecore-search/react';
import { useAccessToken } from './hooks/useAccessToken';
import { useEffect } from 'react';

/**
 * Configuration object for search settings.
 * It uses Vite environment variables.
 * @see https://vitejs.dev/guide/env-and-mode.html
 */
const SEARCH_CONFIG = {
  env: import.meta.env.VITE_SEARCH_ENV,
  customerKey: import.meta.env.VITE_SEARCH_CUSTOMER_KEY,
  apiKey: import.meta.env.VITE_SEARCH_API_KEY,
};

function App() {
  const { language, setLanguage } = useLanguage();
  const { accessToken, refreshToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken)
      refreshToken();
  }, [accessToken, refreshToken]);

  if (!accessToken) {
    return null;
  }

  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>

      <BrowserRouter basename={
          (() => {
            const p = import.meta.env.VITE_SEARCH_PATH || '';
            return p && window.location.pathname.startsWith(p) ? p : '/';
          })()
        }>
          <div className="bg-white dark:bg-gray-700">

            <WidgetsProvider
              env={SEARCH_CONFIG.env}
              customerKey={SEARCH_CONFIG.customerKey}
              apiKey={`Bearer ${accessToken}`}
              requestMiddleware={refreshToken}
              publicSuffix={true}
            >
              <SEOWidget rfkId={'demo_search_seo'} />
              <Header />
              <main className="w-full m-auto pt-[100px] min-h-[700px] bg-white dark:bg-gray-700">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/detail/:id" element={<ArticleDetail />}></Route>
                </Routes>
              </main>
              <Footer />
            </WidgetsProvider>
          </div>
        </BrowserRouter>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
