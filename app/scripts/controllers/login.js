'use strict';

/**
 * @ngdoc function
 * @name cardmgrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cardmgrApp
 */
angular.module('cardmgrApp')
  .controller('LoginCtrl', function ($scope,$state,authService) {
	     $scope.submit = function() {
	       var loggedIn = authService.authenticateUser($scope.username,$scope.password);
	       if (loggedIn) {
	       	  $scope.$emit('updateUserInfo', '');
	       	  $state.go("card",{userName:loggedIn.userName,admin:loggedIn.admin});
	       } else {
	       		  $scope.userForm.username.$setValidity("invaliduser", false);
	       		  $scope.userForm.username.$setValidity("invalidpassword", false);
	       }
      };
  });
