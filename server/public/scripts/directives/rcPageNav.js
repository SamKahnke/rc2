(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .directive('rcPageNav', rcPageNav);

  function rcPageNav() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'templates/directives/rcPageNav.html',

      // Track active page (for styling)
      controller($scope, $location) {
        $scope.isPage = function (pageName) {
          return new RegExp('/' + pageName + '($|/)').test($location.path());
        };
      },
    };
  };
})();
