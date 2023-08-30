import { WidgetDataType, useQuestions, widget } from '@sitecore-search/react';

import { HeroGlassPanel } from './styled';

const HomeHeroWidget = () => {
  const {
    widgetRef,
    queryResult: {
      data: {
        related_questions: relatedQuestionsResponse = [],
      } = {},
    },
  } = useQuestions({
    state: {
      keyphrase: 'What is XM cloud',
      relatedQuestions: 3,
    },
  });
  return (
    <>
      {relatedQuestionsResponse.map((a, index) => (
        <HeroGlassPanel key={`${a.question}-${index}`} ref={widgetRef}>
          <h1>{a.question}</h1>
          <div>{a.answer}</div>
        </HeroGlassPanel>
      ))}
    </>
  );
};

export default widget(HomeHeroWidget, WidgetDataType.QUESTIONS, 'content');
