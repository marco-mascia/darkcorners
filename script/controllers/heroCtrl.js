angular
	.module('darkcorners')
	.controller('heroCtrl', ['$scope', function($scope){		
		$scope.save = function(){
			console.log('heroCtrl save click');
			alert('heroCtrl save click');
		};
	}]);