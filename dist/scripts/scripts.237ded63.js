"use strict";var app=angular.module("cardmgrApp",["ui.router","ngDragDrop"]);app.config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("login",{url:"/",templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).state("card",{url:"/card",templateUrl:"views/card.html",controller:"CardCtrl",controllerAs:"card",params:{admin:!1,userName:null}}),b.otherwise("/")}]),app.service("authService",function(){var a=!1;this.authenticateUser=function(b){if("admin"===b)a=!0;else{if("user"!==b)return!1;a=!1}return this.userName=b,this.admin=a,this}}),app.controller("NavigationCtrl",["$scope","$rootScope","$timeout","authService",function(a,b,c,d){a.showInfo=!1,a.successInfo=!1,b.$on("updateUserInfo",function(){a.user=d.userName,a.showInfo=!0}),b.$on("cardUpdated",function(b,d){a.successInfo=!0,a.success=d,c(function(){a.successInfo=!1},6e4)}),b.$on("updateUserInfo",function(){})}]),angular.module("cardmgrApp").controller("LoginCtrl",["$scope","$state","authService",function(a,b,c){a.submit=function(){var d=c.authenticateUser(a.username,a.password);d?(a.$emit("updateUserInfo",""),b.go("card",{userName:d.userName,admin:d.admin})):(a.userForm.username.$setValidity("invaliduser",!1),a.userForm.username.$setValidity("invalidpassword",!1))}}]),angular.module("cardmgrApp").controller("CardCtrl",["$scope","$state","$stateParams",function(a,b,c){a.list1=[],a.list2=[],a.list3=[],a.list4=[],a.from=null,a.to=null,null==c.userName&&b.go("login"),a.admin=!!c.admin,a.list5=[{title:"Card 1",drag:!0},{title:"Card 2",drag:!0},{title:"Card 3",drag:!0},{title:"Card 4",drag:!0}],a.optionsList1={accept:function(b){return!(a.list1.length>=2)}},a.dropped=function(b,c,d,e,f){a.to=b.target.closest(".panel").id;var g="Card moved from "+a.from+" to "+a.to;a.$emit("cardUpdated",g)},a.dragged=function(b,c,d,e,f){a.from=b.target.closest(".panel").id}}]),angular.module("cardmgrApp").run(["$templateCache",function(a){a.put("views/card.html",'<div class="container-fluid"> <div class="row equal"> <div class="col-xs-12 col-md-3"> <div class="panel panel-default input-panel" id="InputList"> <div class="panel-body"> <div class="btn btn-droppable btn-block" ng-repeat="item in list5" data-drop="true" ng-model="list5" data-jqyoui-options="{accept:\'.btn-draggable:not([ng-model=list5])\'}" jqyoui-droppable="{index: {{$index}}}"> <div class="btn btn-info btn-draggable btn-block" data-drag="{{item.drag}}" data-jqyoui-options="{revert: \'invalid\'}" ng-model="list5" jqyoui-draggable="{index: {{$index}},placeholder:true,animate:true,onDrag:\'dragged\'}" ng-hide="!item.title">{{item.title}}</div> </div> </div> </div> </div> <div class="col-xs-12 col-md-3"> <div class="panel panel-primary" id="List1"> <div class="panel-heading"> <h1 class="panel-title text-center">List1</h1> </div> <div class="panel-body"> <div class="thumbnail" data-drop="true" ng-model="list2" data-jqyoui-options="{accept:\'.btn-draggable:not([ng-model=list2])\'}" jqyoui-droppable="{multiple:true,onDrop:\'dropped\'}"> <div class="buttonHolder"> <div class="btn btn-info btn-draggable btn-block" ng-repeat="item in list2" ng-show="item.title" data-drag="{{item.drag}}" data-jqyoui-options="{revert: \'invalid\'}" ng-model="list2" jqyoui-draggable="{index: {{$index}},animate:true,onDrag:\'dragged\'}">{{item.title}}</div> </div> </div> </div> </div> </div> <!-- begin panel 2 --> <div class="col-xs-12 col-md-3"> <div class="panel panel-primary" id="List2"> <div class="panel-heading"> <h1 class="panel-title">List2</h1> </div> <div class="panel-body"> <div class="thumbnail" data-drop="true" ng-model="list3" data-jqyoui-options="{accept:\'.btn-draggable:not([ng-model=list3])\'}" jqyoui-droppable="{multiple:true,onDrop:\'dropped\'}"> <div class="buttonHolder"> <div class="btn btn-info btn-draggable btn-block" ng-repeat="item in list3" ng-show="item.title" data-drag="{{item.drag}}" data-jqyoui-options="{revert: \'invalid\'}" ng-model="list3" jqyoui-draggable="{index: {{$index}},animate:true,onDrag:\'dragged\'}">{{item.title}}</div> </div> </div> </div> </div> </div> <div class="col-xs-12 col-md-3" ng-show="admin"> <div class="panel panel-primary" id="List3"> <div class="panel-heading"> <h1 class="panel-title">List3</h1> </div> <div class="panel-body"> <div class="thumbnail" data-drop="true" ng-model="list4" data-jqyoui-options="{accept:\'.btn-draggable:not([ng-model=list4])\'}" jqyoui-droppable="{multiple:true,onDrop:\'dropped\' }"> <div class="buttonHolder"> <div class="btn btn-info btn-draggable btn-block" ng-repeat="item in list4" ng-show="item.title" data-drag="{{item.drag}}" data-jqyoui-options="{revert: \'invalid\'}" ng-model="list4" jqyoui-draggable="{index: {{$index}},animate:true,onDrag:\'dragged\'}">{{item.title}}</div> </div> </div> </div> <!-- end panel-body --> </div> <!-- end  panel-primary --> </div> <!-- end col-md-4 --> </div> <!-- end row --> </div>'),a.put("views/login.html",'<div class="container"> <div class="jumbotron"> <p>There are two users in the system. admin/password is admin profile and user/password is user profile</p> </div> <form class="horizontal" name="userForm" ng-submit="submit()"> <div class="form-group"> <span ng-show="userForm.$dirty && userForm.username.$error.invaliduser"><i class="glyphicon glyphicon-info-sign"> </i>Invalid UserName or Password</span> </div> <div class="form-group"> <input type="text" class="form-control" required placeholder="username" name="username" ng-model="username"> </div> <div class="form-group"> <input type="password" class="form-control" required placeholder="password" name="password" ng-model="password"> </div> <div class="form-group"> <button type="submit" class="btn btn-primary">Login</button> </div> </form> </div>')}]);