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

    function factorySubmitMatch(match) {

      var promise = $http.post('/matches', match)
        .then(function (response) {
          if (response.status === 201 && response.status !== 500) {
            console.log('Match added to database');
          } else {
            console.log('Error', response.data);
          }
        });

      return promise;
    }

    var publicApi = {
      refreshMatches: function () {
        return factoryRefreshMatches();
      },

      submitMatch: function (match) {
        return factorySubmitMatch(match);
      },

      getMatches: function () {
        return matches;
      },

    };

    return publicApi;
  };
})();
