import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { ThemeContext } from '../../contexts/theme-context.js';
import HeaderInput from '../HeaderInput/index.jsx';
import Logo from '../Icons/Logo.jsx';
import LocaleSelector from '../LocaleSelector/index.jsx';
import { HeaderContent, HeaderContentWrapper, HeaderWrapper } from './styled';

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleDarkMode = (checked) => {
    if (checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <HeaderWrapper>
      <HeaderContentWrapper>
        <HeaderContent>
          <a href="#" onClick={() => navigate(``)} tabIndex={1}>
            <Logo />
          </a>
          <HeaderInput />
          <DarkModeSwitch checked={theme === 'dark'} onChange={toggleDarkMode} />
          <LocaleSelector />
        </HeaderContent>
      </HeaderContentWrapper>
    </HeaderWrapper>
  );
};

export default Header;
