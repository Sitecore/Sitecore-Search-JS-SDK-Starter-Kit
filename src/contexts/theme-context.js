import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: '',
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme) => {},
});
