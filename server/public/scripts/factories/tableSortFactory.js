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
    let factoryColumnSortValue = DEFAULT_COLUMN;

    // Reverse sort order when user clicks the same column repeatedly
    let reverseOrder = () =>
      DESCEND_PATTERN.test(previousCol) ? previousCol.replace('-', '') : ('-' + previousCol);

    // Reverse order if necessary, update previous column, return new sort value
    let factorySortByColumn = (column) => {
      column = (column === previousCol) ? reverseOrder() : column;
      factoryColumnSortValue = column;
      previousCol = column;
      return factoryColumnSortValue;
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
