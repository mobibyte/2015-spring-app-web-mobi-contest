var app = angular.module('app', []);

app.controller('IndexController', function($scope) {
	$scope.user = {};
	$scope.hasSubmited = false;

	$scope.validateForm = function() {
		$scope.hasSubmited = true;
		if($scope.poll.$valid == true) {
			var temp = $scope.poll.first_name;
			console.log(temp);
			/*$ajax.({
				type: 'POST',
				url: '/submit',
				data: $scope.poll
			});*/
		}
	}
});

app.controller('WinnerController', function($scope, $http) {
	$scope.winner = {};
	$scope.hasWinner = false;

	$scope.findWinner = function() {
		$http.get('/winner').
	  success(function(data, status, headers, config) {
	    $scope.hasWinner = true;
	    $scope.winner = data;
	  }).
	  error(function(data, status, headers, config) {
	  });
	}
});