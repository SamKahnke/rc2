(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .factory('MatchDataFactory', MatchDataFactory);

  MatchDataFactory.$inject = ['$http'];

  function MatchDataFactory($http) {
    let matches;
    let isSuccessful;

    // Return GET request to database's 'matches' table as a promise
    function factoryRefreshMatches() {
      console.log('factoryRefreshMatches called');
      let promise = $http.get('/matches')
        .then(function (response) {
          matches = response.data;
          console.log('factoryRefreshMatches.then called');

          // Calculate total team goals
          for (let i in matches) {
            matches[i].team1Goals = matches[i].t1_p1_goals + matches[i].t1_p2_goals + matches[i].t1_p3_goals;
            matches[i].team2Goals = matches[i].t2_p1_goals + matches[i].t2_p2_goals + matches[i].t2_p3_goals;
          }
        });

      return promise;
    };

    // Return POST request to database's 'matches' table as a promise
    function factorySubmitMatch(match) {
      let promise = $http.post('/matches', match)
        .then((response) => {
          if (response.status === 201 && response.status !== 500) {
            isSuccessful = true;
          } else {
            isSuccessful = false;
          }
        });

      return promise;
    };

    // Create public object for controllers to access
    let publicApi = {
      refreshMatches() {
        return factoryRefreshMatches();
      },

      getMatches() {
        console.log('public getMatches called');
        return matches;
      },

      submitMatch(match) {
        return factorySubmitMatch(match);
      },

      isSuccessfulPost() {
        return isSuccessful;
      },
    };

    return publicApi;
  };
})();
