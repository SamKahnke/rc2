(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .factory('DatabaseFactory', DatabaseFactory);

  DatabaseFactory.$inject = ['$http'];

  function DatabaseFactory($http) {
    var matches;

    function factoryRefreshMatches() {
      var promise = $http.get('/matches').then(function (response) {
        matches = response.data;
      });

      return promise;
    };

    var publicApi = {
      refreshMatches: function () {
        return factoryRefreshMatches();
      },

      getMatches: function () {
        return matches;
      },
    };

    return publicApi;
  };
})();
