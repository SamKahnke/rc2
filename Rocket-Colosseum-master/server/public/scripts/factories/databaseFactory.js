angular.module('RocketColosseum').factory('DatabaseFactory', function ($http) {
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
});
