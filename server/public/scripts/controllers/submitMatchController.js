(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('SubmitMatchController', SubmitMatchController);

  SubmitMatchController.$inject = ['DatabaseFactory', '$scope'];

  function SubmitMatchController(DatabaseFactory, $scope) {

    var databaseFactory = DatabaseFactory;

    $scope.match = {};

    $scope.submitMatch = function (match) {
      databaseFactory.submitMatch(match)
        .then(function () {
          databaseFactory.refreshMatches();
        });
      console.log(match);
    };
  };
})();
