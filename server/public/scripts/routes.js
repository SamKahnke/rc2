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
