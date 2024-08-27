import { Accordion, Content, Header, Item, Trigger } from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { WidgetDataType, useQuestions, widget } from '@sitecore-search/react';
import PropTypes from 'prop-types';

const MainQuestionComponent = ({ answer, question }) => {
  return (
    <div className="p-3 dark:text-gray-100">
      <h4 className="text-lg font-bold ">{question}</h4>
      <p className="mt-2">{answer}</p>
    </div>
  );
};

MainQuestionComponent.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
}

const RelatedQuestionsComponent = ({ relatedQuestions = [] }) => {
  return (
    <div className="dark:text-gray-100">
      {relatedQuestions.length > 0 && (
        <Accordion className="w-full mt-4 px-2" type="multiple">
          <h4 className="text-md font-bold mb-4">People also ask ...</h4>
          {relatedQuestions.map(({ answer, question }, index) => (
            <Item key={index} className="w-full cursor-pointer border-b dark:border-b-gray-600 py-4" value={`${answer}-${index}`}>
              <Header>
                <Trigger className="w-full flex justify-between gap-x-2 text-left text-sm">
                  <span>{question}</span>
                  <ChevronDownIcon height={20} width={20} />
                </Trigger>
              </Header>
              <Content className="pt-5 font-light text-sm">{answer}</Content>
            </Item>
          ))}
        </Accordion>
      )}
    </div>
  );
};

RelatedQuestionsComponent.propTypes = {
  relatedQuestions: PropTypes.array.isRequired,
}

export const QuestionsAnswersComponent = ({ defaultKeyphrase = '', defaultRelatedQuestions = 5 }) => {
  const {
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
      keyphrase: defaultKeyphrase,
      relatedQuestions: defaultRelatedQuestions,
    },
  });
  return (
    <div>
      {((answer && question) || relatedQuestionsResponse.length > 0) && (
        <div className="rounded-md border border-gray-200 dark:border-gray-600 p-3 my-5 shadow-md shadow-slate-300 dark:shadow-slate-500">
          {answer && question && <MainQuestionComponent answer={answer} question={question} />}
          {relatedQuestionsResponse.length > 0 && (
            <RelatedQuestionsComponent relatedQuestions={relatedQuestionsResponse} />
          )}
        </div>
      )}
    </div>
  );
};

QuestionsAnswersComponent.propTypes = {
  defaultKeyphrase: PropTypes.string,
  defaultRelatedQuestions: PropTypes.number,
}

const QuestionsAnswersWidget = widget(QuestionsAnswersComponent, WidgetDataType.QUESTIONS, 'content');

export default QuestionsAnswersWidget;
