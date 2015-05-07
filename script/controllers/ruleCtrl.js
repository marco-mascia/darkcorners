angular
	.module('darkcorners')
	.controller('ruleCtrl', ['$scope', function($scope){
		$scope.addRule = function(){			
			$scope.hero.rules.push({
			    id: $scope.hero.rules.length + 1,
			    descr: $scope.rule.descr
			});	
		};
		$scope.deleteRule = function(index) {
			$scope.hero.rules.splice(index, 1);
		};		
	}]);