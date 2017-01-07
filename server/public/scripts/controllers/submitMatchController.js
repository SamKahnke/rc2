(function () {
  'use strict';

  angular
    .module('RocketColosseum')
    .controller('SubmitMatchController', SubmitMatchController);

  SubmitMatchController.$inject = ['MatchDataFactory', 'UserDataFactory', '$scope', '$timeout'];

  function SubmitMatchController(MatchDataFactory, UserDataFactory, $scope, $timeout) {

    // Factories
    const MATCH_DATA_FACTORY = MatchDataFactory;
    const USER_DATA_FACTORY = UserDataFactory;

    // Initialize scope variables
    $scope.match = {};
    $scope.isSuccessfulPost = false;
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
  };
})();
