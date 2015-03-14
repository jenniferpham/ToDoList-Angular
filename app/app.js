'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
    .config(['$routeProvider', function($routeProvider) {
          $routeProvider.otherwise({redirectTo: '/view1'});
        }])

    .controller('TodoCtrl', function ($scope, $http) {
        $scope.message = 'I use todo lists everyday to get things done';
        $scope.todolist = [];

        $http.get('/api/todos').success(function(todolist) {  //takes all data from api/todoitems and upon success, it calls it awesomeThings
            $scope.todolist = todolist;  //$scope makes it available on main.html
        });

        $scope.addTodo = function (){
            $scope.todolist.push($scope.listItem);
            $scope.listItem="";
        };

        $scope.deleteTodo = function(item){
            var delconfirmation = confirm("Are you sure you want to delete this item? \n Press 'ok' to delete the resource or 'cancel' to keep it as is.");
            if (delconfirmation) {
                var index = $scope.todolist.indexOf(item);
                $scope.todolist.splice(index, 1);
            }
        }
    })