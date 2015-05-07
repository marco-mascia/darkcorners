(function(){
	var app = angular
		.module('darkcorners', [
			'ui.router'
		])		
		.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider){
			$urlRouterProvider.otherwise('/');
			$stateProvider
				.state('home', {
					url: '/', 
					templateUrl: 'templates/home.html',
					controller: 'homeCtrl',
					resolve: {	
						/*									
						heroes: ['$http', function($http){
							return $http.get('http://lostmemories.altervista.org/mh/api/heroes.json').then(function(response){								
								return response.data;
							})
						}]		
						*/			
					}
				})				
				.state('about', {
					url: '/about', 
					templateUrl: 'templates/about.html',
					controller: 'aboutCtrl'
				})
				
		}]);

		app.directive("heroBox", function() {
			return {
				restrict: 'E',
				transclude: true,
				templateUrl: 'templates/hero-box.html',
				controller: 'heroCtrl'			
			};
		});

		app.directive("heroList", function() {
			return {
				restrict: 'E',
				transclude: true,
				templateUrl: 'templates/hero-list.html',
			    controller: function($scope, heroes){
			    	 $scope.heroes = heroes;			     	 
			    }													
			};
		});

		app.directive("equipList", function(){
		    return {
		      restrict: 'E',		      
		      templateUrl: 'templates/equip-list.html',	      
		      controller: 'equipCtrl'		      
		    };
		});
		
		app.directive("rulesList", function(){
		    return {
		      restrict: 'E',		      
		      templateUrl: 'templates/rules-list.html',	      
		      controller: 'ruleCtrl'
		    };
		});

		app.directive("warband", function() {
			return {
				restrict: 'E',
				transclude: true,
				templateUrl: 'templates/warband.html',
				controller: 'wbCtrl'			
			};
		});

		app.directive("addHero", function() {
			return {
				restrict: 'E',
				transclude: true,
				templateUrl: 'templates/add-hero.html',
				controller: 'addHeroCtrl'		
			};
		});
	
	
	app.factory("warbands", ["$firebaseArray",
	  function($firebaseArray) {
	    // create a reference to the Firebase where we will store our data
	    //var randomRoomId = Math.round(Math.random() * 100000000);
	    //var ref = new Firebase("https://mordheim.firebaseio.com/warband/" + randomRoomId);
	    var ref = new Firebase("https://mordheim.firebaseio.com/warband/");	    
	    return $firebaseArray(ref);
	  }
	]);

	/*
	app.controller("WarbandCtrl", ["$scope", "warbands",
	  // we pass our new chatMessages factory into the controller
	  function($scope, warbands) {

		var ref = new Firebase("https://mordheim.firebaseio.com");
	    auth = $firebaseAuth(ref);
	    
	    $scope.login = function() {
	      $scope.authData = null;
	      $scope.error = null;

	      auth.$authAnonymously().then(function(authData) {	    	  
	        $scope.authData = authData;	        
	        console.log("authData ", authData);	        
	      }).catch(function(error) {
	        $scope.error = error;
	      });	      
	    };
		
		
	    $scope.user = "Guest " + Math.round(Math.random() * 100);

	    // we add chatMessages array to the scope to be used in our ng-repeat
	    $scope.wbList = warbands;

	    // a method to create new messages; called by ng-submit
	    $scope.addWarband = function(){
	    console.log('addWarband');
	      $scope.wbList.$add({
	        from: $scope.user,
	        content: $scope.wb
	      });
	      
	      // reset the message input
	      $scope.wb = "";
	    };    	    
	  }
	]);
	*/
	
})();

