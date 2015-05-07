angular
	.module('darkcorners')
	.controller('addHeroCtrl', ['$scope', function($scope){
		$scope.addHero = function(){
			console.log('addHeroCtrl addHero', $scope.hero);
			$scope.heroes.push($scope.hero);
		};
	}]);