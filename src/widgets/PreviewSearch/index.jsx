import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PreviewSearchSuggestionQuery, WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { Presence } from '@sitecore-search/ui';

import { DEFAULT_IMAGE, HIGHLIGHT_DATA } from '../../data/constants';
import { HighlightComponent, getDescription } from '../utils';
import { ArticleCardStyled, LoaderAnimation, LoaderContainer, NavMenuStyled, SearchGroupHeadingStyled } from './styled';
import PropTypes from 'prop-types';

const HighlightType = PropTypes.shape({
  description: PropTypes.arrayOf(PropTypes.string),
  subtitle: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.arrayOf(PropTypes.string),
});

const ArticleType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  image: PropTypes.string,
  source_id: PropTypes.string,
  highlight: HighlightType,
})

const Articles = ({
  loading = false,
  articles,
  onItemClick,
}) => {
  const navigate = useNavigate();
  return (
    <NavMenuStyled.Grid>
      <Presence present={loading}>
        <LoaderContainer>
          <LoaderAnimation
            aria-busy={loading}
            aria-hidden={!loading}
            focusable="false"
            role="progressbar"
            viewBox="0 0 20 20"
          >
            <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
          </LoaderAnimation>
        </LoaderContainer>
      </Presence>
      <NavMenuStyled.SubList>
        {!loading &&
          articles.map((article, index) => (
            <NavMenuStyled.SubItem key={`${article.id}@${article.source_id}`}>
              <NavMenuStyled.Link
                title={article.title}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick({ id: article.id || '', index });
                  navigate(`/detail/${article.id}`);
                }}
              >
                <ArticleCardStyled.Root>
                  <ArticleCardStyled.ImageWrapper>
                    <ArticleCardStyled.Image src={article.image_url || article.image || DEFAULT_IMAGE} />
                  </ArticleCardStyled.ImageWrapper>
                  <ArticleCardStyled.Name>
                    <HighlightComponent
                      text={getDescription(article, 'title')}
                      preSeparator={HIGHLIGHT_DATA.pre}
                      postSeparator={HIGHLIGHT_DATA.post}
                      highlightElement={HIGHLIGHT_DATA.highlightTag}
                    />
                  </ArticleCardStyled.Name>
                </ArticleCardStyled.Root>
              </NavMenuStyled.Link>
            </NavMenuStyled.SubItem>
          ))}
      </NavMenuStyled.SubList>
    </NavMenuStyled.Grid>
  );
};

Articles.propTypes = {
  loading: PropTypes.bool,
  articles: PropTypes.arrayOf(ArticleType),
  onItemClick: PropTypes.func,
};

const Group = ({
  groupTitle,
  groupId,
  filterAttribute,
  articles,
  activeItem,
  onActiveItem,
  onItemClick,
  resetItem,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <SearchGroupHeadingStyled>{groupTitle}</SearchGroupHeadingStyled>
      {articles.map(({ text }) => (
        <NavMenuStyled.Group value={getGroupId(groupId, text)} key={text}>
          <NavMenuStyled.Trigger
            onMouseOver={(e) => {
              const target = e.target;
              target.focus();
            }}
            onClick={() => {
              resetItem();
              navigate(`/search?q=${text}`);
            }}
            onFocus={() => onActiveItem(getGroupId(groupId, text))}
          >
            {text}
          </NavMenuStyled.Trigger>
          <PreviewSearchSuggestionQuery
            active={activeItem === getGroupId(groupId, text)}
            value={text}
            filterAttribute={filterAttribute}
          >
            {({ queryResult: { isFetching, data: { content: articles = [] } = {} } }) => (
              <Articles loading={isFetching} articles={articles} onItemClick={onItemClick} />
            )}
          </PreviewSearchSuggestionQuery>
        </NavMenuStyled.Group>
      ))}
    </>
  );
};

Group.propTypes = {
  groupTitle: PropTypes.string,
  groupId: PropTypes.string,
  filterAttribute: PropTypes.string,
  articles: PropTypes.arrayOf(PropTypes.shape({
    freq: PropTypes.number,
    name: PropTypes.string,
  })),
  activeItem: PropTypes.string,
  onActiveItem: PropTypes.func,
  onItemClick: PropTypes.func,
  resetItem: PropTypes.func,
};

const getGroupId = (name, value) => `${name}@${value}`;

export const PreviewSearchComponent = ({ defaultProductsPerPage = 6 }) => {
  const {
    widgetRef,
    state: { keyphrase },
    actions: { onItemClick, onKeyphraseChange },
    queryResult: {
      isFetching,
      isLoading,
      data: {
        content: articles = [],
        suggestion: {
          title_context_aware: articleSuggestions = [],
        } = {},
      } = {},
    },
  } = usePreviewSearch({
    query: (query) => {
      query
        .getRequest()
        .setSearchQueryHighlightFragmentSize(500)
        .setSearchQueryHighlightFields(['title', 'description'])
        .setSearchQueryHighlightPreTag(HIGHLIGHT_DATA.pre)
        .setSearchQueryHighlightPostTag(HIGHLIGHT_DATA.post);
    },
    state: {
      suggestionsList: [{ suggestion: 'title_context_aware', max: 10 }],
        itemsPerPage: defaultProductsPerPage,
        keyphrase: '',
    },
  });

  const loading = isLoading || isFetching;
  const [activeItem, setActiveItem] = useState('defaultArticlesResults');
  const [value, setValue] = useState('');
  const onValueChange = (newValue) => {
    setValue(newValue);
  };

  const keyphraseHandler = useCallback(
    (event) => {
      const target = event.target;
      if (keyphrase !== target.value) {
        onKeyphraseChange({ keyphrase: target.value });
      }
    },
    [onKeyphraseChange, keyphrase],
  );

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target.query;
    setValue('');
    navigate(`/search?q=${target.value}`);
  };

  return (
    <NavMenuStyled.Root onValueChange={onValueChange} value={value}>
      <NavMenuStyled.MainList>
        <NavMenuStyled.MainListItem>
          <form onSubmit={handleSubmit}>
            <NavMenuStyled.InputTrigger
              name="query"
              onKeyUp={keyphraseHandler}
              onFocus={() => {
                if (keyphrase.length > 0) {
                  setActiveItem('defaultArticlesResults');
                }
              }}
              autoComplete="off"
              placeholder="Type to search..."
            />
          </form>
          <NavMenuStyled.MainContent>
            <Presence present={loading}>
              <LoaderContainer>
                <LoaderAnimation
                  aria-busy={loading}
                  aria-hidden={!loading}
                  focusable="false"
                  role="progressbar"
                  viewBox="0 0 20 20"
                >
                  <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                </LoaderAnimation>
              </LoaderContainer>
            </Presence>
            {!loading && (
              <NavMenuStyled.SubContent orientation="vertical" value={activeItem} ref={widgetRef}>
                <NavMenuStyled.GroupList>
                  {articleSuggestions.length > 0 && (
                    <Group
                      groupTitle="Suggestions"
                      groupId="keyphrase"
                      articles={articleSuggestions}
                      onItemClick={onItemClick}
                      activeItem={activeItem}
                      onActiveItem={setActiveItem}
                      resetItem={() => setValue('')}
                    />
                  )}
                  <NavMenuStyled.DefaultGroup value="defaultArticlesResults" key="defaultArticlesResults">
                    <NavMenuStyled.DefaultTrigger aria-hidden />
                    <Articles articles={articles} onItemClick={onItemClick} />
                  </NavMenuStyled.DefaultGroup>
                </NavMenuStyled.GroupList>
              </NavMenuStyled.SubContent>
            )}
          </NavMenuStyled.MainContent>
        </NavMenuStyled.MainListItem>
      </NavMenuStyled.MainList>
    </NavMenuStyled.Root>
  );
};

PreviewSearchComponent.propTypes = {
  defaultProductsPerPage: PropTypes.number,
}

const PreviewSearchWidget = widget(PreviewSearchComponent, WidgetDataType.PREVIEW_SEARCH, 'content');
export default PreviewSearchWidget;
