'use strict';

var noomeyControllers = angular.module('noomeyControllers', []);
var noomeyServices = angular.module('noomeyServices', ['ngResource']);

//var clevershootProviders = angular.module('clevershootProviders', ['ngResource']);

var noomey = angular.module('noomey', [
	'ngRoute',
	'noomeyControllers',
	/*'clevershootProviders'*/
	'noomeyServices'
]);

noomey.config(['$routeProvider', '$locationProvider', '$httpProvider',
	function($routeProvider, $locationProvider, $httpProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider.
			when('/dashboard', {
				controller: 'dashboardCtrl',
				templateUrl: '/webapp/templates/dashboard/index.html'
			}).
			otherwise({
				redirectTo: '/dashboard'
			});

			// when('/', {
			// 	controller: 'homeCtrl',
			// 	templateUrl: '/templates/home/index.html'
			// }).
			// when('/add', {
			// 	controller: 'shootCtrl',
			// 	templateUrl: '/templates/shoot/add.html'
			// }).
			// when('/:shoot_id', {
			// 	controller: 'shootCtrl',
			// 	templateUrl: '/templates/shoot/index.html'
			// }).
			// when('/:shoot_id/config', {
			// 	controller: 'shootConfigCtrl',
			// 	templateUrl: '/templates/shoot/config.html'
			// }).
			// when('/reference/add', {
			// 	controller: 'referenceCtrl',
			// 	templateUrl: '/templates/reference/add.html'
			// }).
			// when('/reference/:id', {
			// 	controller: 'referenceCtrl',
			// 	templateUrl: '/templates/job/index.html'
			// }).
			// otherwise({
			// 	redirectTo: '/'
			// });

	}]);