'use strict';

/**
 * @ngdoc overview
 * @name cardmgrApp
 * @description
 * # cardmgrApp
 *
 * Main module of the application.
 */
 var app=angular.module('cardmgrApp',['ui.router','ngDragDrop']);
  app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .state('card', {
                url: '/card',
                templateUrl: 'views/card.html',
                controller: 'CardCtrl',
                controllerAs: 'card',
                params:{
                    admin:false,
                    userName:null
                }
            });

        $urlRouterProvider.otherwise('/');

    });

  app.service('authService', function() {
        var userName = null;
        var isAdmin = false;

        this.authenticateUser = function(userName) {
            if (userName === "admin") {
              isAdmin = true;
            } else if (userName === "user") {
              isAdmin = false;
            } else {
              return false;
            }
            this.userName = userName;
            this.admin= isAdmin;
            return this;
        };
    });


app.controller('NavigationCtrl',function($scope,$rootScope,$timeout,authService) {
    $scope.showInfo=false;
    $scope.successInfo=false;
    $rootScope.$on('updateUserInfo', function() {
        $scope.user=authService.userName;
        $scope.showInfo=true;
    });
    $rootScope.$on('cardUpdated', function(event,message) {
         $scope.successInfo=true;
          $scope.success=message;
          $timeout( function(){
           $scope.successInfo=false; 
       }, 60000);
    });
    $rootScope.$on('updateUserInfo', function() {
    });
});