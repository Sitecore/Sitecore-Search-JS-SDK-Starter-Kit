import { useSearchParams } from 'react-router-dom';

import { PAGE_EVENTS_SEARCH } from '@/data/constants';
import withPageTracking from '@/hocs/withPageTracking';
import QuestionsAnswers from '@/widgets/QuestionsAnswers/index.jsx';
import SearchResults from '@/widgets/SearchResults/index.jsx';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="max-w-[1248px] m-auto pt-10">
      <div>
        <h2 className="text-gray-800 dark:text-gray-100 text-lg w-full text-left">{`Showing results for "${query}"`}</h2>
        <QuestionsAnswers
          key={`${query}-questions`}
          rfkId="rfkid_qa"
          defaultKeyphrase={query}
          defaultRelatedQuestions={4}
        />
        <SearchResults key={`${query}-search`} rfkId="rfkid_7" defaultKeyphrase={query} />
      </div>
    </div>
  );
};

export default withPageTracking(Search, PAGE_EVENTS_SEARCH);
