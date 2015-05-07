angular
	.module('darkcorners')
	.controller('equipCtrl', ['$scope', function($scope){
		$scope.addItem = function(index){
			$scope.hero.items.push({
			    id: $scope.hero.items.length + 1,
			    weapon: $scope.item.weapon,
			    cost: $scope.item.cost
			});
		};
		$scope.delete = function(index){
			 $scope.hero.items.splice(index, 1);
		};
	}]);