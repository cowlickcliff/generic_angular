var app = angular.module("app", [])

app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  });

  $routeProvider.otherwise({ redirectTo: '/login' });

});

app.controller("LoginController", function($scope, $location ) {
  $scope.credentials = { username: "", password: "" };

  $scope.login = function() {
      if ($scope.credentials.username === "test") {
	  $location.path('/home');
      }
  }
});

app.controller("HomeController", function($scope ) {
    $scope.logout = function() {
      $location.path('/login');
    }
});
