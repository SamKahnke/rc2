angular.module('RocketColosseum').config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/stats',
    })

    .when('/stats', {
      templateUrl: 'assets/templates/stats.html',
      controller: 'StatsPageController',
    })

    .when('/schedule-match', {
      templateUrl: 'assets/templates/scheduleMatch.html',
      controller: 'ScheduleMatchController',
    })

    .when('/submit-match', {
      templateUrl: 'assets/templates/submitMatch.html',
      controller: 'SubmitMatchController',
    });
});
