(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('UserController', UserController);

  UserController.$inject = ['UserDataFactory', '$scope', '$http', '$location'];

  function UserController(UserDataFactory, $scope, $http, $location) {

    // Factories
    const USER_DATA_FACTORY = UserDataFactory;

    $scope.currentUser;
    $scope.$parent.isLoggedIn;

    //--------------------------------------------------
    //----------------CHECK IF LOGGED IN----------------
    //--------------------------------------------------

    $scope.getCurrentUser = (() => {
      USER_DATA_FACTORY.refreshCurrentUser()
        .then(() => {
          $scope.currentUser = USER_DATA_FACTORY.getCurrentUser();
          $scope.$parent.isLoggedIn = USER_DATA_FACTORY.isLoggedIn();
          console.log('$scope.currentUser: ', $scope.currentUser);
        });
    })();

    $scope.logout = () => {
      $http.get('/user/logout')
        .then((response) => {
          console.log('logged out');
          $location.path('/login');
        });
    };
  }
})();
