// instantiate an app variable for our application from angular
var app = angular.module("app", ['ui.bootstrap'])


// configure the app object by adding routes
app.config(function($routeProvider) {

  // Bascially a list of cases where if the URL is A then show template-A and use controller-A...
  $routeProvider.when('/choose-user-case', {
    templateUrl: 'views/choose-user-case.html',
    controller: 'ChooseUserCaseController'
  });

  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  });

  $routeProvider.otherwise({ redirectTo: '/choose-user-case' });

});


function CollapseDemoCtrl($scope) {
    console.log("isCollapsed: " + $scope.isCollapsed);
    $scope.isCollapsed = false;
}



// create a logincontroler and create a single method for it.
app.controller("ChooseUserCaseController", function($scope, $location ) {

    $scope.choose = function() {
	// initialize localstorage
	var testUsers =  {
	    'test'	: 'test',
	    'jack'	: 'jack',
	    'debbie'	: 'debbie',
	    'stan'	: 'stan',
	};
	
	// clear the localstorage
	localStorage.clear();

	// Put the object into storage
	localStorage.setItem('testUsers', JSON.stringify(testUsers));

	$location.path('/login');
    }
});




// create a logincontroler and create a single method for it.
app.controller("LoginController", function($scope, $location, AuthenticationService ) {
  

  //$scope.credentials = { username: "test", password: "test" };
  $scope.credentials = { username: "test", password: "test"};

  $scope.login = function() {
      // retrieve the test users from localstorage
      var users = JSON.parse( localStorage.getItem('testUsers') );

      if ($scope.credentials.password === users[$scope.credentials.username]) {
	  $location.path('/home');
      }
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



app.factory("ChooseUserCaseService", function() {
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



