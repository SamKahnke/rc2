(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('StatsController', StatsController);

  StatsController.$inject = ['MatchDataFactory', 'TableSortFactory', 'UserDataFactory', '$scope'];

  function StatsController(MatchDataFactory, TableSortFactory, UserDataFactory, $scope) {

    // Factories
    const MATCH_DATA_FACTORY = MatchDataFactory;
    const TABLE_SORT_FACTORY = TableSortFactory;
    const USER_DATA_FACTORY = UserDataFactory;

    // Initialize scope variables
    $scope.matches;
    $scope.statRowId;
    $scope.columnSortValue;
    $scope.currentUser;
    $scope.$parent.isLoggedIn;
    //--------------------------------------------------
    //----------------CHECK IF LOGGED IN----------------
    //--------------------------------------------------

    $scope.getCurrentUser = function () {
      console.log('$scope.getCurrentUser called');
      USER_DATA_FACTORY.refreshCurrentUser()
        .then(function () {
          MATCH_DATA_FACTORY.refreshMatches()
          .then(function () {
            $scope.currentUser = USER_DATA_FACTORY.getCurrentUser();
            $scope.$parent.isLoggedIn = USER_DATA_FACTORY.isLoggedIn();
            $scope.matches = MATCH_DATA_FACTORY.getMatches();
            console.log('$scope.currentUser: ', $scope.currentUser);
            console.log('$scope.matches: ', $scope.matches);
          });
        });
    };

    //--------------------------------------------------
    //---------------------DATABASE---------------------
    //--------------------------------------------------

    // Refresh match list, then bind list to scope variable "matches"
    // $scope.getMatches = () => {
    //   console.log('$scope.getMatches called');
    //   MATCH_DATA_FACTORY.refreshMatches()
    //     .then(() => {
    //       console.log('$scope.refreshMatches.then called');
    //       // $scope.matches = MATCH_DATA_FACTORY.getMatches();
    //     });
    // };

    $scope.getCurrentUser();

    //--------------------------------------------------
    //------------------USER INTERFACE------------------
    //--------------------------------------------------

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
