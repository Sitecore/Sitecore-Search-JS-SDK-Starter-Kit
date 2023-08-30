import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

import { DEFAULT_IMAGE } from '../../data/constants';
import {
  DetailDescription,
  DetailHeader,
  DetailHeaderContent,
  DetailHeaderImage,
  DetailHeaderTitle,
  DetailSubtitle,
  DetailWrapper,
} from './styled';
import PropTypes from 'prop-types';

export const ArticleDetailComponent = ({ id }) => {
  const {
    widgetRef,
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults((query) => {
    const equalFilter = new FilterEqual('id', id);
    console.log(equalFilter.toJson());
    query.getRequest().setSearchFilter(equalFilter);
    return {
      itemsPerPage: 1,
    };
  });
  let mainArticle = { id: '', title: '' };
  if (articles.length > 0) {
    mainArticle = articles[0];
  }
  return (
    <DetailWrapper ref={widgetRef}>
      <DetailHeader>
        <DetailHeaderContent>
          <DetailHeaderTitle>{mainArticle.title}</DetailHeaderTitle>
        </DetailHeaderContent>
        <DetailHeaderContent>
          <DetailHeaderImage src={mainArticle.image_url || mainArticle.image || DEFAULT_IMAGE} />
        </DetailHeaderContent>
      </DetailHeader>
      <DetailSubtitle>{mainArticle?.subtitle}</DetailSubtitle>
      <DetailDescription>{mainArticle?.description}</DetailDescription>
    </DetailWrapper>
  );
};


ArticleDetailComponent.propTypes = {
  id: PropTypes.string,
};
const ArticleDetailWidget = widget(ArticleDetailComponent, WidgetDataType.SEARCH_RESULTS, 'content');

export default ArticleDetailWidget;
