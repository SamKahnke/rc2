(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['UserDataFactory', '$scope', '$http', '$location'];

  function LoginController(UserDataFactory, $scope, $http, $location) {

    // Factories
    const USER_DATA_FACTORY = UserDataFactory;

    $scope.user = {
      username: '',
      password: '',
    };

    $scope.message = '';
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
        });
    })();

    $scope.login = function () {
      if ($scope.user.username === '' || $scope.user.password === '') {
        $scope.message = 'Enter your username and password!';
      } else {
        console.log('sending user authentication to server...\nscope.user:\n', $scope.user);
        $http.post('/login', $scope.user)
          .then(function (response) {
            if (response.data.username) {
              console.log('success: ', response.data);
              console.log('redirecting to user page');
              $location.path('/user');
            } else {
              console.log('failure: ', response);
              $scope.message = 'Username or password is incorrect!';
            }
          });
      }
    };
  };
})();
