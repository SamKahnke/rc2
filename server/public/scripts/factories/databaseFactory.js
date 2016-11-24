angular.module('RocketColosseum').factory('DatabaseFactory', function($http){
  function retrieveMatches() {
    console.log('retrieveMatches is running in factory');
    var promise = $http.get('/matches');
    return promise;
  };
  console.log('DB Factory is running');
  // function retrievePlayers() {
  //   var promise = $http.get('/players');
  //   return promise;
  // };

  var publicApi = {
    getMatches: function () {
      return retrieveMatches();
    },
    // getPlayers: function () {
    //   return retrievePlayers;
    // }
  };

  return publicApi;
});
