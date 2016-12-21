(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .factory('TableSortFactory', TableSortFactory);

  function TableSortFactory() {
    const DEFAULT_COLUMN = '-match_date';
    const DESCEND_PATTERN = /^-/;

    // Set initial column values to default string
    let previousCol = DEFAULT_COLUMN;
    let columnSortValue = DEFAULT_COLUMN;

    // Reverse sort order when user clicks the same column repeatedly
    let _reverseOrder = () =>
      DESCEND_PATTERN.test(previousCol) ? previousCol.replace('-', '') : ('-' + previousCol);

    // Reverse order if necessary, update previous column, return new sort value
    /* Note:  Columns will sort in ascending order by default when new column is clicked.
              To default to descending, add "-" to front of 'column' argument in HTML. */
    let factorySortByColumn = (column) => {
      column = (column === previousCol) ? _reverseOrder() : column;
      columnSortValue = column;
      previousCol = column;
      return columnSortValue;
    };

    // Create public object for controllers to access
    let publicApi = {
      sortByColumn(column) {
        return factorySortByColumn(column);
      },
    };

    return publicApi;
  };
})();
