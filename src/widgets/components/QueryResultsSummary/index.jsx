import PropTypes from 'prop-types';

const QueryResultsSummary = ({
  currentPage,
  itemsPerPage,
  totalItems,
  totalItemsReturned,
}) => {
  return (
    <div className="font-bold my-auto mx-0">
      Showing {itemsPerPage * (currentPage - 1) + 1} - {itemsPerPage * (currentPage - 1) + totalItemsReturned} of{' '}
      {totalItems} results
    </div>
  );
};

QueryResultsSummary.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItemsReturned: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
}

export default QueryResultsSummary;
