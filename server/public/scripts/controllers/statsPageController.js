(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('StatsPageController', StatsPageController);

  StatsPageController.$inject = ['DatabaseFactory', '$scope'];

  function StatsPageController(DatabaseFactory, $scope) {

    var databaseFactory = DatabaseFactory;

    $scope.matches;
    $scope.statRowId;

    $scope.getMatches = (function () {
      databaseFactory.refreshMatches().then(function () {
        $scope.matches = databaseFactory.getMatches();
      });
    })();

    // Active tab controls
    const DEFAULT_TAB_ID = 1;
    $scope.tab = DEFAULT_TAB_ID;

    $scope.setTab = function (tabId) {
      $scope.tab = tabId;
    };

    $scope.currentTab = function (tabId) {
      return $scope.tab === tabId;
    };

    // Active detail panel controls
    $scope.isCollapsed = function (statRowId) {
      return $scope.statRowId !== statRowId;
    };

    $scope.expandDetails = function (statRowId) {
      $scope.statRowId = $scope.isCollapsed(statRowId) ? statRowId : undefined;
    };

    // Table sort controls
    const DEFAULT_COLUMN = '-match_date';
    const DESCEND_PATTERN = /^-/;

    var previousCol = DEFAULT_COLUMN;
    $scope.sorterColumn = DEFAULT_COLUMN;

    var reverseOrder = function () {
      return DESCEND_PATTERN.test(previousCol) ? previousCol.replace('-', '') : ('-' + previousCol);
    };

    $scope.sortByColumn = function (column) {
      column = (column === previousCol) ? reverseOrder() : column;
      $scope.sorterColumn = column;
      previousCol = column;
    };
  }
})();
