import { useParams } from 'react-router-dom';

import { PAGE_EVENTS_PDP } from '@/data/constants';
import withPageTracking from '@/hocs/withPageTracking';
import ArticleDetailWidget from '@/widgets/ArticleDetail/index.jsx';

const ArticleDetail = () => {
  const { id } = useParams();
  return <ArticleDetailWidget key={id} id={id} rfkId="rfkid_7" />;
};

export default withPageTracking(ArticleDetail, PAGE_EVENTS_PDP);
