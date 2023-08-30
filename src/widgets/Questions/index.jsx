import { useState } from 'react';

import { WidgetDataType, useQuestions, widget } from '@sitecore-search/react';

import {
  AnswerAreaWrapper,
  FrequentQuestionBoxTitle,
  FrequentQuestionIconClosed,
  FrequentQuestionIconOpen,
  FrequentQuestionTitle,
  FrequentQuestionsBox,
  PrimaryQuestionBox,
  PrimaryQuestionBoxAnswer,
  PrimaryQuestionBoxTitle,
} from './styled';
import PropTypes from 'prop-types';

const FrequentQuestion = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <FrequentQuestionTitle onClick={() => setExpanded(!expanded)}>
        {question} {expanded ? <FrequentQuestionIconOpen /> : <FrequentQuestionIconClosed />}
      </FrequentQuestionTitle>
      {expanded && <p>{answer}</p>}
    </div>
  );
};

FrequentQuestion.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.number,
}

const QuestionsComponent = ({ keyphrase = '', defaultRelatedQuestions = 4 }) => {
  const {
    widgetRef,
    queryResult: {
      data: {
        related_questions: relatedQuestionsResponse = [],
        answer: { answer, question } = {
          answer: undefined,
          question: undefined,
        },
      } = {},
    },
  } = useQuestions({
    state: {
      keyphrase,
      relatedQuestions: defaultRelatedQuestions,
    },
  });
  return (
    <>
      {answer && question && (
        <AnswerAreaWrapper ref={widgetRef}>
          <PrimaryQuestionBox>
            <PrimaryQuestionBoxTitle>{question}</PrimaryQuestionBoxTitle>
            <PrimaryQuestionBoxAnswer>{answer}</PrimaryQuestionBoxAnswer>
          </PrimaryQuestionBox>
          {relatedQuestionsResponse.length > 0 && (
            <FrequentQuestionsBox>
              <FrequentQuestionBoxTitle>People also ask ...</FrequentQuestionBoxTitle>
              {relatedQuestionsResponse.map(({ answer, question }, index) => (
                <FrequentQuestion key={`${question}-${index}`} question={question} answer={answer} />
              ))}
            </FrequentQuestionsBox>
          )}
        </AnswerAreaWrapper>
      )}
    </>
  );
};

QuestionsComponent.propTypes = {
  keyphrase: PropTypes.string,
  defaultRelatedQuestions: PropTypes.number,
}

export default widget(QuestionsComponent, WidgetDataType.QUESTIONS, 'content');
