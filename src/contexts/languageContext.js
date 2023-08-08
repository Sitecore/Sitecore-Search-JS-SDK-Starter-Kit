import { createContext } from 'react';

export const LanguageContext = createContext({
  language: '',
  // eslint-disable-next-line no-unused-vars
  setLanguage: (l) => {},
});
