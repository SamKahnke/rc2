angular.module('RocketColosseum').controller('StatsPageController', function(DatabaseFactory, $scope){
  var databaseFactory = DatabaseFactory;
  const DEFAULT_TAB_ID = 1;

  $scope.matches;
  $scope.getMatches = function () {
    $scope.matches = databaseFactory.getMatches();
  }

  console.log("scope.matches: ", $scope.matches);
  console.log("databaseFactory.getMatches: ", databaseFactory.getMatches());
// Active tab controls
  $scope.tab = DEFAULT_TAB_ID;

  $scope.setTab = function(tabId){
    $scope.tab = tabId;
  }

  $scope.tabIsSet = function(tabId){
    return $scope.tab === tabId;
  }
});
