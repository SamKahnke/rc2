(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .factory('DatabaseFactory', DatabaseFactory);

  DatabaseFactory.$inject = ['$http'];

  function DatabaseFactory($http) {
    let matches;

    // Return GET request to database's 'matches' table as a promise
    function factoryRefreshMatches() {
      let promise = $http.get('/matches').then((response) => {
        matches = response.data;
      });

      return promise;
    };

    // Return POST request to database's 'matches' table as a promise
    function factorySubmitMatch(match) {
      let promise = $http.post('/matches', match)
        .then((response) => {
          if (response.status === 201 && response.status !== 500) {
            console.log('Match added to database');
          } else {
            console.log('Error', response.data);
          }
        });

      return promise;
    };

    // Create public object for controllers to access
    let publicApi = {
      refreshMatches() {
        return factoryRefreshMatches();
      },

      submitMatch(match) {
        return factorySubmitMatch(match);
      },

      getMatches() {
        return matches;
      },
    };

    return publicApi;
  };
})();
