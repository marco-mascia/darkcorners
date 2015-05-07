angular
	.module('darkcorners')
	.controller('homeCtrl', ['$scope', 'heroes', function($scope, heroes){		
		$scope.title = "Home title";
		$scope.heroes = heroes;		
		$scope.editMode = false;
		$scope.save = function(){
			console.log('save click');
			//$http.post('http://lostmemories.altervista.org/mh/api/friends', friends);
		};		
	}]);