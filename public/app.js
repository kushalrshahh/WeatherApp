'use strict';
// MODULE

var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

//ROUTES

weatherApp.config(function($routeProvider, $locationProvider){

	$locationProvider.hashPrefix('!');

	$routeProvider
	.when('/',{

		templateUrl: 'home.htm',
		controller: 'homeController'
	})
	.when('/forecast',{
		templateUrl: 'forecast.htm',
		controller: 'forecastController'
	})

	.when('/forecast/:days',{
		templateUrl: 'forecast.htm',
		controller: 'forecastController'
	})
	.otherwise( { redirectTo: "/" });
});

//SERVICES

weatherApp.service('cityService',function(){

	this.city="New York,NY";
});

//CONTROLLERS
weatherApp.controller('homeController',['$scope','$location','cityService',function($scope,$location,cityService){

  $scope.city=cityService.city;
  $scope.$watch('city',function(){
        cityService.city=$scope.city;
  });
  $scope.submit=function(){
                 
                $location.path("/forecast");
};
}]);

weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams,cityService){

	$scope.city=cityService.city;

	$scope.days = $routeParams.days || '2';
$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback: "JSON_CALLBACK"}, { get: {method:"JSONP"}});

$scope.weatherResult=$scope.weatherAPI.get({q: $scope.city, cnt: $scope.days });



$scope.convertToDegreeCelsius = function(degk){

	return Math.round((((1.8*(degk - 273)) + 32)-32)*0.55);
};
$scope.convertToFarenheit = function(degk){

	return Math.round((1.8*(degk - 273)) + 32);
};


$scope.convertToDate=function(dt){

	return new Date(dt*1000);
};

}]);


