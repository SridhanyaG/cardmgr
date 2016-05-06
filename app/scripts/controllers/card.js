'use strict';

/**
 * @ngdoc function
 * @name cardmgrApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cardmgrApp
 */
angular.module('cardmgrApp').controller('CardCtrl', function ($scope,$state,$stateParams) {
  $scope.list1 = [];
  $scope.list2 = [];
  $scope.list3 = [];
  $scope.list4 = [];
  $scope.from = null;
  $scope.to = null;
  if ($stateParams.userName == null) {
     $state.go("login");
  }
  $scope.admin=$stateParams.admin?true:false;

  $scope.list5 = [
    { 'title': 'Card 1', 'drag': true },
    { 'title': 'Card 2', 'drag': true },
    { 'title': 'Card 3', 'drag': true },
    { 'title': 'Card 4', 'drag': true },
   
  ];

  // Limit items to be dropped in list1
  $scope.optionsList1 = {
    accept: function(dragEl) {
      if ($scope.list1.length >= 2) {
        return false;
      } else {
        return true;
      }
    }
  };
  $scope.dropped = function(event,index,item,type,external) {
    $scope.to = event.target.closest('.panel').id;
    var message="Card moved from "+$scope.from+" to "+$scope.to;
    $scope.$emit('cardUpdated',message);
    }
   $scope.dragged = function(event,index,item,type,external) {
    $scope.from = event.target.closest('.panel').id;
  }
 });
