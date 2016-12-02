angular.module('RocketColosseum').controller('StatsPageController', function(DatabaseFactory, $scope){
  var databaseFactory = DatabaseFactory;

  $scope.matches;
  $scope.detailId;

  $scope.getMatches = function () {
    databaseFactory.refreshMatches().then(function () {
      $scope.matches = databaseFactory.getMatches();
      $scope.detailId = $scope.matches[0].id;
    });
  }();

// Active tab controls
  const DEFAULT_TAB_ID = 1;
  $scope.tab = DEFAULT_TAB_ID;

  $scope.setTab = function (tabId) {
    $scope.tab = tabId;
  }

  $scope.currentTab = function (tabId) {
    return $scope.tab === tabId;
  }

// Active detail panel controls
  $scope.setDetails = function (detailId) {
    $scope.detailId = detailId;
  }

  $scope.currentDetails = function (detailId) {
    return $scope.detailId === detailId;
  }

// Table sort controls
  const DEFAULT_COLUMN = '-match_date';
  const DESCEND_PATTERN = /^-/;

  var previousCol = DEFAULT_COLUMN;
  $scope.sorterColumn = DEFAULT_COLUMN;

  var reverseOrder = function () {
    return DESCEND_PATTERN.test(previousCol) ? previousCol.replace("-", "") : ('-' + previousCol);
  }

  $scope.sortByColumn = function (column) {
    column = (column === previousCol) ? reverseOrder() : column;
    $scope.sorterColumn = column;
    previousCol = column;
  }
});
