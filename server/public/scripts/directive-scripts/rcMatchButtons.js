angular.module('RocketColosseum').directive('rcMatchButtons', function(){
  return {
    replace: true,
    restrict: "E",
    templateUrl: "assets/templates/directives/rcMatchButtons.html"
  };
});
