import { HTMBlockWidget } from '@sitecore-search/react';

import HomeHeroWidget from '../../widgets/HomeFAQ/index.jsx';
import { FAQBackground, FAQContent, FAQPageSection } from './styled';

const HomeHero = () => {
  return (
    <FAQPageSection>
      <FAQBackground />
      <HTMBlockWidget rfkId="faqs_title" />
      <FAQContent>
        <HomeHeroWidget rfkId="rfkid_qa" />
      </FAQContent>
    </FAQPageSection>
  );
};

export default HomeHero;
