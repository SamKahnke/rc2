angular.module('RocketColosseum').config(function($routeProvider){
  $routeProvider
    .when('/', {
      redirectTo: '/stats'
    })

    .when('/stats', {
      templateUrl: "assets/templates/stats/stats-page.html",
      controller: "StatsPageController"
    });
});
