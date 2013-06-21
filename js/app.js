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



app.factory("DataService", function() {
  var data	= {};

  return {
      setData:function (key, value) {
	  data[key] = value;
      },
      getData:function () {
	  return data;
      }
  };
    });




// create a logincontroler and create a single method for it.
app.controller("ChooseUserCaseController", function($scope, $location, DataService) {

    $scope.submit = function() {
	// initialize localstorage
	var testUsers =  {
	    'test' : {
		'username' : 'test',
		'password' : 'test',
		'appdata'  : [],
	    },
	    'jack' : {
		'username' : 'jack',
		'password' : 'jack',
		'appdata'  : [],
	    },
	    'debbie' : {
		'username' : 'debbie',
		'password' : 'debbie',
		'appdata'  : [],
	    },
	    'stan' : {
		'username' : 'stan',
		'password' : 'stan',
		'appdata'  : [],
	    },
	};
	
	// clear the localstorage
	localStorage.clear();

	// Put the object into storage
	localStorage.setItem('testUsers', JSON.stringify(testUsers));

	console.log("choice: " + $scope.choice);

	DataService.setData('choice', $scope.choice);

	$location.path('/login');
    }
});




// create a logincontroler and create a single method for it.
app.controller("LoginController", function($scope, $location, AuthenticationService ) {
  
  $scope.credentials = { username: "test", password: "test" };

  $scope.login = function() {
      console.log("logging in with username " + $scope.credentials.username);

      // retrieve the test users from localstorage
      AuthenticationService.login($scope.credentials);
  }
});

// create home controller and a logout method
app.controller("HomeController", function($scope, AuthenticationService, DataService ) {
    $scope.logout = function() {
	var d = DataService.getData();
	console.log("saved data " + JSON.stringify(d));

	AuthenticationService.logout();
    }
});


app.factory("AuthenticationService", function($location) {
  var credentials	= {};
  var users		= JSON.parse( localStorage.getItem('testUsers') );
  return {
    login: function(c) {
      credentials = c;
      console.log("credentials " + JSON.stringify(credentials));

      // if the username doesn't exist in the users hash or if the password is wrong, show an alert
      if ( !(credentials.username in users) || users[ credentials.username ].password !== credentials.password ) {
	  alert("Either your username or password is incorrect");
      } else {
        $location.path('/home');
      }
    },
    logout: function() {
      $location.path('/login');
    },
    get: function() { 
	  console.log("credentials " + JSON.stringify(credentials));
	  return credentials; 
    }
  };
});




/*  Adding some bootstrap stuff */
function CollapseDemoCtrl($scope) {
    $scope.isCollapsed = true;
}


function CarouselDemoCtrl($scope) {
    $scope.myInterval = 5000;
  $scope.slides = [
      {image: 'http://placekitten.com/200/200',text: 'Kitten.'},
      {image: 'http://placekitten.com/225/200',text: 'Kitty!'},
      {image: 'http://placekitten.com/250/200',text: 'Cat.'},
      {image: 'http://placekitten.com/275/200',text: 'Feline!'}
  ];
    $scope.addSlide = function() {
	$scope.slides.push({
	    image: 'http://placekitten.com/'+(200+25*Math.floor(Math.random()*4))+'/200',
	    text: ['More','Extra','Lots of','Surplus'][Math.floor(Math.random()*4)] + ' ' +
		['Cats', 'Kittys', 'Felines', 'Cutes'][Math.floor(Math.random()*4)]
	});
    };
}