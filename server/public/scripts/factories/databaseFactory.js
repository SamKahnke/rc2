(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .factory('DatabaseFactory', DatabaseFactory);

  DatabaseFactory.$inject = ['$http'];

  function DatabaseFactory($http) {
    let matches;
    let isSuccessful;

    // Return GET request to database's 'matches' table as a promise
    function factoryRefreshMatches() {
      let promise = $http.get('/matches')
        .then((response) => {
          matches = response.data;

          // Calculate total team scores
          for (let i in matches) {
            matches[i].team1Score = matches[i].t1_p1_score + matches[i].t1_p2_score + matches[i].t1_p3_score;
            matches[i].team2Score = matches[i].t2_p1_score + matches[i].t2_p2_score + matches[i].t2_p3_score;
          }
      });

      return promise;
    };

    // Return POST request to database's 'matches' table as a promise
    function factorySubmitMatch(match) {
      let promise = $http.post('/matches', match)
        .then((response) => {
          if (response.status === 201 && response.status !== 500) {
            console.log('Match added to database');
            isSuccessful = true;
          } else {
            console.log('Error', response.data);
            isSuccessful = false;
          }
        });

      return promise;
    };

    // Create public object for controllers to access
    let publicApi = {
      isSuccessfulPost() {
        return isSuccessful;
      },

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
