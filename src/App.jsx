import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SEOWidget, WidgetsProvider } from '@sitecore-search/react';
import { createTheme } from '@sitecore-search/ui';

import { LanguageContext } from './contexts/languageContext.js';
import { ThemeContext } from './contexts/themeContext.js';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Footer from './components/Footer/index.jsx';
import Header from './components/Header/index.jsx';
import useLanguage from './hooks/useLanguage';
import lightTheme from './themes/light.json';
import darkTheme from './themes/dark.json';
import { GlobalStyle } from './styled.js';
import Search from './pages/Search.jsx';
import useTheme from './hooks/useTheme';
import Home from './pages/Home.jsx';

function getTheme(theme) {
  if (theme === 'light') {
    return lightTheme;
  }
  return darkTheme;
}

/**
 * Configuration object for discover settings.
 * It uses Vite environment variables.
 * @see https://vitejs.dev/guide/env-and-mode.html
 */
const DISCOVER_CONFIG = {
  env: import.meta.env.VITE_SEARCH_ENV,
  customerKey: import.meta.env.VITE_SEARCH_CUSTOMER_KEY,
  apiKey: import.meta.env.VITE_SEARCH_API_KEY,
};

function App() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { style } = createTheme(getTheme(theme));

  return (
    <>
      <GlobalStyle />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <BrowserRouter basename={import.meta.env.VITE_SEARCH_PATH}>
            <div className="App" style={style}>
              <WidgetsProvider
                env={DISCOVER_CONFIG.env}
                customerKey={DISCOVER_CONFIG.customerKey}
                apiKey={DISCOVER_CONFIG.apiKey}
                publicSuffix={true}
              >
                <SEOWidget rfkId={'search_seo'} />
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/detail/:id" element={<ArticleDetail />}></Route>
                </Routes>
                <Footer />
              </WidgetsProvider>
            </div>
          </BrowserRouter>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
