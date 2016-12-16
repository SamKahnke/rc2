(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .factory('TableSortFactory', TableSortFactory);

  function TableSortFactory() {
    const DEFAULT_COLUMN = '-match_date';
    const DESCEND_PATTERN = /^-/;

    var previousColumn = DEFAULT_COLUMN;
    var factoryColumnSortValue = DEFAULT_COLUMN;

    var reverseOrder = function () {
      return DESCEND_PATTERN.test(previousColumn) ? previousColumn.replace('-', '') : ('-' + previousColumn);
    };

    var factorySortByColumn = function (column) {
      column = (column === previousColumn) ? reverseOrder() : column;
      factoryColumnSortValue = column;
      previousColumn = column;
      return factoryColumnSortValue;
    };

    var publicApi = {
      sortByColumn: function (column) {
        return factorySortByColumn(column);
      },
    };

    return publicApi;
  };
})();
