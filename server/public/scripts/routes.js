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

      .otherwise({
        redirectTo: 'stats',
      });
  };
})();
