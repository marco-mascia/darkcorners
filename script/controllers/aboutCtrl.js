angular
	.module('darkcorners')
	.controller('aboutCtrl', ['$scope', function($scope){		
		$scope.title = "About";
		$scope.items = ['home', 'about', 'contact'];
	}]);