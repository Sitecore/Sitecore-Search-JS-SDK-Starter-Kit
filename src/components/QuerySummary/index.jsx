import { MainQuerySummary, SummaryHighlight, QuerySummaryWrapper } from './styled';
import PropTypes from 'prop-types';

const QuerySummary = ({ resultsPerPage, totalResults, currentPage }) => {
  const showResultFrom = (currentPage - 1) * resultsPerPage + 1;
  const showResultTo = showResultFrom + resultsPerPage - 1;
  return (
    <QuerySummaryWrapper>
      <MainQuerySummary>
        <span>
          Showing <SummaryHighlight>{showResultFrom}</SummaryHighlight> to
          <SummaryHighlight> {showResultTo < totalResults ? showResultTo : totalResults} </SummaryHighlight>
          from <SummaryHighlight>{totalResults} </SummaryHighlight> results
        </span>
      </MainQuerySummary>
    </QuerySummaryWrapper>
  );
};

QuerySummary.propTypes = {
  resultsPerPage: PropTypes.number,
  totalResults: PropTypes.number,
  currentPage: PropTypes.number,
}

export default QuerySummary;
