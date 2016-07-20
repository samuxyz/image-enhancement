var app = angular.module('routeController', [])
	.controller('RouteController', function($scope, $location, $rootScope){	
		 //$scope.showHome = $location.path() === '/add';
		 $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      		$scope.showHome = next.templateUrl === "/partials/add.html";
  		});
	}); 