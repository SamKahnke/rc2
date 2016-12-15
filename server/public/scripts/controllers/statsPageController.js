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
      databaseFactory.refreshMatches()
        .then(function () {
          $scope.matches = databaseFactory.getMatches();
          for (var i = 0, l = $scope.matches.length; i < l; i++) {
            var m = $scope.matches[i]
            m.team1Score = m.t1_p1_score + m.t1_p2_score + m.t1_p3_score;
            m.team2Score = m.t2_p1_score + m.t2_p2_score + m.t2_p3_score;
          }
        });
    })();

    // Sort table on click
    $scope.sortByColumn = function (column) {
      $scope.columnSortValue = tableSortFactory.sortByColumn(column);
    };

    // Track active tab to apply style
    const DEFAULT_TAB_ID = 1;
    $scope.tab = DEFAULT_TAB_ID;

    $scope.setTab = function (tabId) {
      $scope.tab = tabId;
    };

    $scope.currentTab = function (tabId) {
      return $scope.tab === tabId;
    };

    // Expand and collapse panels
    $scope.isCollapsed = function (statRowId) {
      return $scope.statRowId !== statRowId;
    };

    $scope.expandDetails = function (statRowId) {
      $scope.statRowId = $scope.isCollapsed(statRowId) ? statRowId : undefined;
    };
  }
})();
