(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('StatsPageController', StatsPageController);

  StatsPageController.$inject = ['DatabaseFactory', 'TableSortFactory', '$scope'];

  function StatsPageController(DatabaseFactory, TableSortFactory, $scope) {

    // Factories
    const DATABASE_FACTORY = DatabaseFactory;
    const TABLE_SORT_FACTORY = TableSortFactory;

    // Initialize scope variables
    $scope.matches;
    $scope.statRowId;
    $scope.columnSortValue;

    // Refresh match list, then bind list to scope variable "matches"
    $scope.getMatches = (() => {
      DATABASE_FACTORY.refreshMatches()
        .then(() => {
          $scope.matches = DATABASE_FACTORY.getMatches();
        });
    })();

    // Sort table by column when user clicks column title
    $scope.sortByColumn = (column) =>
      $scope.columnSortValue = TABLE_SORT_FACTORY.sortByColumn(column);

    // Track active tab (for styling)
    const DEFAULT_TAB_ID = 1;
    $scope.tab = DEFAULT_TAB_ID;

    $scope.setTab = (tabId) => $scope.tab = tabId;
    $scope.currentTab = (tabId) => $scope.tab === tabId;

    // Track active stat row (for collapse animation on details panels)
    $scope.isCollapsed = (statRowId) => $scope.statRowId !== statRowId;

    $scope.expandDetails = (statRowId) =>
      $scope.statRowId = $scope.isCollapsed(statRowId) ? statRowId : undefined;
  }
})();
