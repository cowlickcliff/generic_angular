// instantiate an app variable for our application from angular
var app = angular.module("app", [])


// configure the app object by adding routes
app.config(function($routeProvider) {

  // Bascially a list of case the URL is... then show template-A and use controller-A...
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

// create a logincontroler and create a single method for it.
app.controller("LoginController", function($scope, $location ) {
  $scope.credentials = { username: "test", password: "whatwhat" };

  $scope.login = function() {
      if ($scope.credentials.username === "test") {
	  $location.path('/home');
      }
  }
});

// create home controller and a logout method
app.controller("HomeController", function($scope ) {
    $scope.logout = function() {
      $location.path('/login');
    }
});
