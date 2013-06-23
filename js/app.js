// instantiate an app variable for our application from angular
var app = angular.module("app", ['ui.bootstrap']);

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

  $routeProvider.when('/page2', {
    templateUrl: 'views/page2.html',
    controller: 'Page2Controller'
  });

  $routeProvider.otherwise({ redirectTo: '/choose-user-case' });

});



app.factory("DataService", function() {
  var data	= {};

  return {
      setData:function (key, value) {
	  console.log("setData: " + key + "; value: " + value);
	  data[key] = value;
      },
      getData:function (key) {
	  return data[key];
      },
      getAllData:function() {
	  return data;
      },
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


app.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };
}]);


// create a logincontroler and create a single method for it.
app.controller("LoginController", function($scope, $location, AuthenticationService, DataService ) {

  $scope.credentials = { username: DataService.getData("choice"), password: DataService.getData("choice") };

  if (DataService.getData("login") == true ) {
      $location.path('/home');
      //DataService.setData("showModal", true);
  }

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


// create page2  controller 
app.controller("Page2Controller", function($scope, AuthenticationService, DataService ) {
    $scope.logout = function() {
	var d = DataService.getData();
	console.log("saved data " + JSON.stringify(d));

	AuthenticationService.logout();
    }
});





app.factory("AuthenticationService", function($location, DataService) {
  var credentials	= { 
      "login" : false,
  };
  var users		= JSON.parse( localStorage.getItem('testUsers') );
  return {
    login: function(c) {
      credentials = c;
      console.log("credentials " + JSON.stringify(credentials));

      // if the username doesn't exist in the users hash or if the password is wrong, show an alert
      if ( !(credentials.username in users) || users[ credentials.username ].password !== credentials.password ) {
	  alert("Either your username or password is incorrect");
      } else {

	DataService.setData('login', true);
        $location.path('/home');
      }
    },
    logout: function() {
      console.log("final data: " + JSON.stringify(DataService.getAllData()));
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

var ModalDemoCtrl = function ($scope, DataService) {

    console.log("checking showModal" + DataService.getData("showModal"));
    if (DataService.getData("showModal") == true) {
	$scope.shouldBeOpen = true;
	DataService.setData("showModal", false);
    }

    $scope.open = function () {
	$scope.shouldBeOpen = true;
    };

    $scope.close = function () {
	$scope.closeMsg = 'I was closed at: ' + new Date();
	$scope.shouldBeOpen = false;
    };

    $scope.items = ['item1', 'item2'];

    $scope.opts = {
	backdropFade: true,
	dialogFade:true
    };

};
