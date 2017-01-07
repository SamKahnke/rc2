(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('SubmitMatchController', SubmitMatchController);

<<<<<<< HEAD
  SubmitMatchController.$inject = ['MatchDataFactory', 'UserDataFactory', '$scope', '$timeout'];

  function SubmitMatchController(MatchDataFactory, UserDataFactory, $scope, $timeout) {

    // Factories
    const MATCH_DATA_FACTORY = MatchDataFactory;
    const USER_DATA_FACTORY = UserDataFactory;
=======
  SubmitMatchController.$inject = ['DatabaseFactory', '$scope', '$timeout'];

  function SubmitMatchController(DatabaseFactory, $scope, $timeout) {

    // Factories
    const DATABASE_FACTORY = DatabaseFactory;
>>>>>>> 3993de59a76985338af7d804dc847a896ec5304e

    // Initialize scope variables
    $scope.match = {};
    $scope.isSuccessfulPost = false;
<<<<<<< HEAD
    $scope.currentUser;
    $scope.$parent.isLoggedIn;
    //--------------------------------------------------
    //----------------CHECK IF LOGGED IN----------------
    //--------------------------------------------------

    $scope.getCurrentUser = function () {
      USER_DATA_FACTORY.refreshCurrentUser()
        .then(function () {
          $scope.currentUser = USER_DATA_FACTORY.getCurrentUser();
          $scope.$parent.isLoggedIn = USER_DATA_FACTORY.isLoggedIn();
        });
    };

    //--------------------------------------------------
    //---------------------DATABASE---------------------
    //--------------------------------------------------

    // Post match, then refresh match list
    $scope.submitMatch = (match) => {
      MATCH_DATA_FACTORY.submitMatch(match)
        .then(() => {
          $scope.isSuccessfulPost = MATCH_DATA_FACTORY.isSuccessfulPost();
          // MATCH_DATA_FACTORY.refreshMatches();
          $timeout(() => $scope.isSuccessfulPost = false, 1800);
        });
    };



    //--------------------------------------------------
    //------------------USER INTERFACE------------------
    //--------------------------------------------------

    // Track active tab (for styling)
    const DEFAULT_TAB_ID = 1;
    $scope.tab = DEFAULT_TAB_ID;

    $scope.setTab = (tabId) => $scope.tab = tabId;
    $scope.currentTab = (tabId) => $scope.tab === tabId;

    $scope.getCurrentUser();
=======

    // Post match, then refresh match list
    $scope.submitMatch = (match) => {
      DATABASE_FACTORY.submitMatch(match)
        .then(() => {
          $scope.isSuccessfulPost = DATABASE_FACTORY.isSuccessfulPost();
          DATABASE_FACTORY.refreshMatches();
          $timeout(() => $scope.isSuccessfulPost = false, 1800);
        });
    };
>>>>>>> 3993de59a76985338af7d804dc847a896ec5304e
  };
})();
