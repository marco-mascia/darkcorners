angular
	.module('darkcorners')
	.controller('homeCtrl', ['$scope', 'weapontags', function($scope, weapontags){		
		$scope.title = "Home title";
		$scope.weapontags = weapontags;		
		$scope.items = ['home', 'about', 'contact'];
		$scope.selectedValue = 'home';		
	}]);