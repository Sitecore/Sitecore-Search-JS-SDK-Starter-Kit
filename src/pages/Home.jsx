import { PAGE_EVENTS_HOME } from '@/data/constants';
import withPageTracking from '@/hocs/withPageTracking';
import HomeHighlighted from '@/widgets/HomeHighlighted/index.jsx';
import { HTMBlockWidget } from '@sitecore-search/react';

const Home = () => {
  return (
    <>
      <HTMBlockWidget rfkId="home_hero" />
      <HTMBlockWidget rfkId="highlight_title" />
      <HomeHighlighted rfkId="search_home_highlight_articles" />
    </>
  );
};

export default withPageTracking(Home, PAGE_EVENTS_HOME);
