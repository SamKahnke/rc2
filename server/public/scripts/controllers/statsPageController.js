(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('StatsPageController', StatsPageController);

  StatsPageController.$inject = ['DatabaseFactory', 'TableSortFactory', '$scope'];

  function StatsPageController(DatabaseFactory, TableSortFactory, $scope) {

    var databaseFactory = DatabaseFactory;
    var tableSortFactory = TableSortFactory;

    $scope.matches;
    $scope.statRowId;
    $scope.columnSortValue;

    $scope.getMatches = (function () {
      databaseFactory.refreshMatches().then(function () {
        $scope.matches = databaseFactory.getMatches();
      });
    })();

    // Table sort controls
    $scope.sortByColumn = function (column) {
      $scope.columnSortValue = tableSortFactory.sortByColumn(column);
    };

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
  }
})();
