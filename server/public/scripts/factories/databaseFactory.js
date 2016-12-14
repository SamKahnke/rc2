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
      console.log(match);
      var submittedMatch = {
        team1:        match.team1,
        team2:        match.team2,
        t1_p1:        match.t1_p1,
        t1_p1_score:  match.t1_p1_score,
        t1_p2:        match.t1_p2,
        t1_p2_score:  match.t1_p2_score,
        t1_p3:        match.t1_p3,
        t1_p3_score:  match.t1_p3_score,
        t2_p1:        match.t2_p1,
        t2_p1_score:  match.t2_p1_score,
        t2_p2:        match.t2_p2,
        t2_p2_score:  match.t2_p2_score,
        t2_p3:        match.t2_p3,
        t2_p3_score:  match.t2_p3_score,
        match_date:   match.match_date,
      };

      var promise = $http.post('/matches', submittedMatch)
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
