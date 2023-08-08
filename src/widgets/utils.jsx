import PropTypes from 'prop-types';

export const getDescription = (article, key) => {
  if (article?.highlight && article?.highlight[key] && (article.highlight[key] || []).length > 0) {
    return (article.highlight[key] || []).join(' ');
  }
  return article[key] || '';
};

export const HighlightComponent = ({
  text,
  preSeparator,
  postSeparator,
  highlightElement,
}) => {
  const elements = text.split(preSeparator);
  const Highlight = highlightElement;
  if (elements.length > 1) {
    return (
      <div>
        {elements.map((e, index) => {
          if (e.includes(postSeparator)) {
            const parts = e.split(postSeparator);
            return (
              <span key={index}>
                <Highlight key={`${index}-${index}`}>{parts[0]}</Highlight> {parts[1]}
              </span>
            );
          } else {
            return <span key={index}>{e}</span>;
          }
        })}
      </div>
    );
  }
  return <>{text}</>; // means that separator is not in the text
};

HighlightComponent.propTypes = {
  text: PropTypes.string,
  preSeparator: PropTypes.string,
  postSeparator: PropTypes.string,
  highlightElement: PropTypes.elementType,
};
