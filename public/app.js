(function(){
  var app = angular.module('myApp', ['ngRoute', 'ngResource', 'routeController', 'mainController', 'addController', 'imageService', 'toastr' ])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/main.html',
		    controller: 'MainController'
      })
  	  .when('/add', {
        templateUrl: '/partials/add.html',
		    controller: 'AddController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    //Set the API key globally
  	filepicker.setKey("YOUR_API_KEY");

  }]); 
})();