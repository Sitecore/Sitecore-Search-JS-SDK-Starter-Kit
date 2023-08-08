import { useContext } from 'react';
import Select from 'react-select';

import { theme } from '@sitecore-search/ui';

import { LanguageContext } from '../../contexts/languageContext.js';
import locales from '../../data/languages.js';
import { LocaleSelectorIcon, LocaleSelectorWrapper } from './styled';

const colourStyles = {
  control: (styles) => ({ ...styles, background: 'transparent' }),
  option: (styles) => {
    return {
      ...styles,
    };
  },
  input: (styles) => ({ ...styles, color: `${theme.vars.palette.primary.contrastText}` }),
  placeholder: (styles) => ({ ...styles, color: `${theme.vars.palette.primary.contrastText}` }),
  singleValue: (styles) => ({ ...styles, color: `${theme.vars.palette.primary.contrastText}` }),
};

const LocaleSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const handleChange = (item) => {
    setLanguage(item.value);
  };
  const selectedIndex = locales.findIndex(({ value }) => value === language) || 0;
  return (
    <LocaleSelectorWrapper>
      <LocaleSelectorIcon
        src="https://wwwsitecorecom.azureedge.net/-/media/newnavigation/icon-language.svg"
        alt="Locale Selector"
      />
      <Select onChange={handleChange} options={locales} defaultValue={locales[selectedIndex]} styles={colourStyles} />
    </LocaleSelectorWrapper>
  );
};

export default LocaleSelector;
