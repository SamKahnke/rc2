(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('SubmitMatchController', SubmitMatchController);

  SubmitMatchController.$inject = ['DatabaseFactory', '$scope'];

  function SubmitMatchController(DatabaseFactory, $scope) {

    // Factories
    const DATABASE_FACTORY = DatabaseFactory;

    // Initialize scope variables
    $scope.match = {};

    // Post match, then refresh match list
    $scope.submitMatch = (match) => {
      DATABASE_FACTORY.submitMatch(match)
        .then(() => DATABASE_FACTORY.refreshMatches());
      console.log(match);
    };
  };
})();
