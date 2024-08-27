import { Link } from 'react-router-dom';

import { DarkmodeSwitch } from '@/components/DarkModeSwitcher';
import LocaleSelector from '@/components/LocaleSelector/index.jsx';
import Logo from '@/components/Logo/index.jsx';
import PreviewSearch from '@/widgets/PreviewSearch/index.jsx';

const Header = () => {
  return (
    <div className="header-outer">
      <div className="header-inner">
        <div className="flex items-center justify-between">
          <Link to="/" tabIndex={1}>
            <Logo />
          </Link>
          <PreviewSearch rfkId="rfkid_6" defaultItemsPerPage={6} />
          <DarkmodeSwitch />
          <LocaleSelector />
        </div>
      </div>
    </div>
  );
};

export default Header;
