(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .factory('UserDataFactory', UserDataFactory);

  UserDataFactory.$inject = ['$http'];

  function UserDataFactory($http) {
    let currentUser;
    let users;
    let isLoggedIn;

    function factoryRefreshCurrentUser() {
      let promise = $http.get('/user')
        .then(function (res) {
          currentUser = res.data;
          if (currentUser) {
            isLoggedIn = true;
          } else {
            isLoggedIn = false;
          }
          console.log('currentUser', currentUser);
          console.log('isLoggedIn', isLoggedIn);
        });

      return promise;
    };

    function factoryRefreshUsers() {
      let promise = $http.get('/users')
        .then((response) => users = response.data);

      return promise;
    };

    function factoryIsUniqueUsername(username) {
      for (var i = 0, l = users.length; i < l; i++) {
        if (users[i].username === username) {
          return false;
        }
      }

      return true;
    };

    // Create public object for controllers to access
    let publicApi = {
      refreshCurrentUser() {
        return factoryRefreshCurrentUser();
      },

      getCurrentUser() {
        return currentUser;
      },

      isLoggedIn() {
        return isLoggedIn;
      },

      refreshUsers() {
        return factoryRefreshUsers();
      },

      getUsers() {
        return users;
      },

      isUniqueUser(username) {
        return factoryIsUniqueUsername(username);
      },
    };

    return publicApi;
  };
})();
