var app = angular.module('app', []);

app.controller('IndexController', function($scope) {
	$scope.user = {};

	$scope.funccc = function() {
		console.log($scope.user.first_name);
	}
});