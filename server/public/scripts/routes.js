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
<<<<<<< HEAD
        controller: 'StatsController',
      })

      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
      })

      .when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController',
      })

      .when('/user', {
        templateUrl: 'templates/user.html',
        controller: 'UserController',
=======
        controller: 'StatsPageController',
      })

      .when('/calendar', {
        templateUrl: 'templates/calendar.html',
        controller: 'CalendarPageController',
      })

      .when('/schedule-match', {
        templateUrl: 'templates/scheduleMatch.html',
        controller: 'ScheduleMatchController',
>>>>>>> 3993de59a76985338af7d804dc847a896ec5304e
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
