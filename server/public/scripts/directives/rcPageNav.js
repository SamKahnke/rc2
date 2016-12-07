(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .directive('rcPageNav', rcPageNav);

  function rcPageNav() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/rcPageNav.html',
      controller: function ($scope, $location) {
        $scope.isPage = function (pageName) {
          return new RegExp('/' + pageName + '($|/)').test($location.path());
        };
      },
    };
  };
})();
