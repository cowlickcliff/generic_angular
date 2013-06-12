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
app.controller("LoginController", function($scope, $location, AuthenticationService ) {
  

  $scope.credentials = { username: "test", password: "whatwhat" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials);
  }
});

// create home controller and a logout method
app.controller("HomeController", function($scope, AuthenticationService ) {
    $scope.logout = function() {
	AuthenticationService.logout();
    }
});


app.factory("AuthenticationService", function($location) {
  return {
    login: function(credentials) {
      if (credentials.username !== "test" || credentials.password !== "whatwhat") {
        alert("Username must be 'ralph', password must be 'wiggum'");
      } else {
        $location.path('/home');
      }
    },
    logout: function() {
      $location.path('/login');
    }
  };
});
