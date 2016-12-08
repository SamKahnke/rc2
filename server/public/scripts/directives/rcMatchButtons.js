(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .directive('rcMatchButtons', rcMatchButtons);

  function rcMatchButtons() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'templates/directives/rcMatchButtons.html',
      controller: function ($scope, $location) {
        $scope.isPage = function (pageName) {
          return new RegExp('/' + pageName + '($|/)').test($location.path());
        };
      },
    };
  }
})();
