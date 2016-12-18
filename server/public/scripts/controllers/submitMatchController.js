(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('SubmitMatchController', SubmitMatchController);

  SubmitMatchController.$inject = ['DatabaseFactory', '$scope', '$timeout'];

  function SubmitMatchController(DatabaseFactory, $scope, $timeout) {

    // Factories
    const DATABASE_FACTORY = DatabaseFactory;

    // Initialize scope variables
    $scope.match = {};
    $scope.isSuccessfulPost = false;

    // Post match, then refresh match list
    $scope.submitMatch = (match) => {
      DATABASE_FACTORY.submitMatch(match)
        .then(() => {
          $scope.isSuccessfulPost = DATABASE_FACTORY.isSuccessfulPost();
          DATABASE_FACTORY.refreshMatches();
          $timeout(function () {
              $scope.isSuccessfulPost = false;
            }, 2000);
        });

      console.log(match);
    };
  };
})();
