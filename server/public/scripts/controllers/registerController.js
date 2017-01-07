(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserDataFactory', '$scope', '$http', '$location'];

  function RegisterController(UserDataFactory, $scope, $http, $location) {

    // Factories
    const USER_DATA_FACTORY = UserDataFactory;

    $scope.user = {
      username: '',
      password: '',
    };

    $scope.users;
    $scope.message = '';
    $scope.currentUser;
    $scope.$parent.isLoggedIn;

    $scope.getUsers = (() => {
      console.log('getusers');
      USER_DATA_FACTORY.refreshUsers()
        .then(() => {
          $scope.users = USER_DATA_FACTORY.getUsers();
        });
    })();

    //--------------------------------------------------
    //----------------CHECK IF LOGGED IN----------------
    //--------------------------------------------------

    $scope.getCurrentUser = (() => {
      USER_DATA_FACTORY.refreshCurrentUser()
        .then((res) => {
          $scope.currentUser = USER_DATA_FACTORY.getCurrentUser();
          $scope.$parent.isLoggedIn = USER_DATA_FACTORY.isLoggedIn();
        });
    })();

    $scope.registerUser = () => {

      if ($scope.user.username === '' || $scope.user.password === '') {
        $scope.message = 'Choose a username and password!';
      } else {
        console.log('sending user information to server...\nscope.user:\n', $scope.user);
        $http.post('/register', $scope.user)
          .then((response) => {
              console.log('success');
              $location.path('/stats');
            },

            (error, response) => {
              $scope.isUniqueUser = USER_DATA_FACTORY.isUniqueUser($scope.user.username);
              if (!$scope.isUniqueUser) {
                $scope.message = 'That username already exists!';
              } else {
                console.log('error', error);
                $scope.message = 'Please try again.';
              }
            });
      }
    };
  };
})();
