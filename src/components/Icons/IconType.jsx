import ArticleIcon from './ArticleIcon';
import BlogIcon from './BlogIcon';
import CalendarIcon from './CalendarIcon';
import NewsIcon from './NewsIcon.jsx';

const getIcon = (type) => {
  switch (type) {
    case 'Blogs':
      return <BlogIcon />;
    case 'Webinar':
      return <CalendarIcon />;
    case 'News':
      return <NewsIcon />;
    case 'Events':
      return <CalendarIcon />;
    default:
      return <ArticleIcon />;
  }
};

export default getIcon;
