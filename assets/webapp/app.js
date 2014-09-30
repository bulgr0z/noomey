'use strict';

// if the server provides (or replace) the jwt, set it in sessionStorage
if (loginJwt.length > 0) sessionStorage.jwt = loginJwt;
if (!sessionStorage.jwt || sessionStorage.jwt.length < 1) {
	alert('no jwt found on the client');
}

var noomeyControllers = angular.module('noomeyControllers', []);
var noomeyServices = angular.module('noomeyServices', ['ngResource']);

var noomey = angular.module('noomey', [
	'ngRoute',
	'noomeyControllers',
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

angular.element(document).ready(function() {
	angular.bootstrap(document, ['noomey']);
});