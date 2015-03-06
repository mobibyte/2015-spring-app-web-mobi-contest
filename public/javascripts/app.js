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