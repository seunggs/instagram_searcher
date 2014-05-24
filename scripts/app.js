angular.module('myApp', ['ngAnimate'])
.controller('mainCtrl', function($scope, $http, $timeout) {
	//initialize variables
	$scope.formData = {};
	$scope.submitted = false;
	$scope.responseValid = false;

	$scope.resetForm = function() {
		$scope.master = {};
		$scope.formData = angular.copy($scope.master);
	};

	$scope.search = function(keyword) {
		//clear the text field
		//$scope.resetForm();

		//search for the images in Instagram through JSONP

		var urlBuilder = function(url1, param, url2) {
			var url = url1 + param.toString() + url2
			return url;
		};

		var url = urlBuilder("https://api.instagram.com/v1/tags/", keyword, "/media/recent");
		var request = {
			client_id: "a5dc51696eb641b39c7749862884cea5",
			callback: "JSON_CALLBACK"
		};

		$http({
			method: 'JSONP',
			url: url,
			params: request
		})
		.success(function(response) {
			$scope.photos = response.data;
			$scope.photoCount = $scope.photos.length;
			$scope.responseValid = true;
		})
		.error(function() {
			alert('error');
		})

	};
})