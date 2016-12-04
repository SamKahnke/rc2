angular.module("RocketColosseum").directive('rcPageNav', function(){
  return {
    replace: true,
    restrict: "E",
    templateUrl: "assets/templates/directives/rcPageNav.html",
    controller: function($scope, $location){
      $scope.isPage = function (pageName) {
        return new RegExp("/" + pageName + "($|/)").test($location.path());
      };
    }
  };
});
