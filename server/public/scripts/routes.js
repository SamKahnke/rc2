(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .config(provideRoutes);

  provideRoutes.$inject = ['$routeProvider'];

  function provideRoutes($routeProvider) {
    $routeProvider
      .when('/stats', {
        templateUrl: 'templates/stats.html',
        controller: 'StatsPageController',
      })

      .when('/calendar', {
        templateUrl: 'templates/calendar.html',
        controller: 'CalendarPageController',
      })

      .when('/schedule-match', {
        templateUrl: 'templates/scheduleMatch.html',
        controller: 'ScheduleMatchController',
      })

      .when('/submit-match', {
        templateUrl: 'templates/submitMatch.html',
        controller: 'SubmitMatchController',
      })

      .otherwise({
        redirectTo: 'stats',
      });
  };
})();
