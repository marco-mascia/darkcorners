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
						heroes: ['$http', function($http){
							return $http.get('http://lostmemories.altervista.org/mh/api/heroes.json').then(function(response){								
								return response.data;
							})
						}]					
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
		      restrict: "E",
		      templateUrl: "templates/equip-list.html",	      
		      controller: function($scope){	 

		    	 $scope.addItem = function(index) {
	    	        items.push({
	    	            id: $scope.items.length + 1,
	    	            weapon: $scope.weapon,
	    	            cost: $scope.cost
	    	        });
		    	 };	    	 
		    	 $scope.deleteItem = function(index) {
		    	     items.splice(index, 1);
		    	 };	    	 
		    	 
		      },
		      controllerAs: "eqCtrl"
		    };
		});
		
		app.directive("rulesList", function(){
		    return {
		      restrict: "E",
		      templateUrl: "templates/rules-list.html",	      
		      controller: function($scope){
		      	/*
		    	 $scope.rules = rules;   	    	 
		    	 $scope.addRule = function(index) {
		    		 rules.push({
	    	            id: $scope.rules.length + 1,
	    	            descr: $scope.descr
	    	            
	    	        });
		    	 };	    	 
		    	 $scope.deleteRule = function(index) {
		    		 rules.splice(index, 1);
		    	 };	    
				*/
		      },
		      controllerAs: "ruleCtrl"
		    };
		});

	app.factory("heroes", function(){
	    var heroes = [{
	    	name: "Will", 
	    	type: "slow", 
	    	ws: 4,
	    	rules: [{
	    		id: 1,
	    		descr: "rule1"
	    	}],
	    	items: [{ 
	    		id: 1,
	        	weapon: "Dagger",
	        	cost: "Free"
	        }]
	    },{ name: "Laura",
	    	type: "fast",
	    	ws: 4,
	    	rules: [{
	    		id: 2,
	    		descr: "rule2"
	    	}],
	    	items: [{
	    		id: 1,
	        	weapon: "Dagger",
	        	cost: "Free"
	    	}]
	    }];

	    return heroes;
	});
	
	
	app.factory("warbands", ["$firebaseArray",
	  function($firebaseArray) {
	    // create a reference to the Firebase where we will store our data
	    var randomRoomId = Math.round(Math.random() * 100000000);
	    var ref = new Firebase("https://mordheim.firebaseio.com/warband/" + randomRoomId);
	    // this uses AngularFire to create the synchronized array
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

	/*
	app.controller("SampleCtrl", function($scope, $firebaseObject) {
	  var ref = new Firebase("https://mordheim.firebaseio.com/data");	  
	  var syncObject = $firebaseObject(ref);  
	  syncObject.$bindTo($scope, "data");
	});
	*/	
	/*
	app.controller("WarbandController", ["$scope", "$firebaseArray",
	    function($scope, $firebaseArray) {
			var ref = new Firebase("https://mordheim.firebaseio.com/warband");
	    }
	]);
	
	app.controller('HeroController', function($scope){		
		this.heroes = heroes;
		this.nHero = nHero;		
		this.updateHero = function(hero){
			console.log('update hero on db ', hero);
		};
	});
	
	app.controller('ProfileController', function($scope, $firebaseObject){		
	  var ref = new Firebase("https://mordheim.firebaseio.com/warband");
	  // download the data into a local object
	  var syncObject = $firebaseObject(ref);
	  // synchronize the object with a three-way data binding
	  // click on `index.html` above to see it used in the DOM!
	  syncObject.$bindTo($scope, "warband");
	  
	  $scope.heroes = $firebaseArray(ref);
	  
		$scope.hero = nHero;	      
		$scope.addHero = function(){	    	  
	       if ($scope.hero.name) {
	        	console.log($scope.hero);
	            heroes.push($scope.hero);	
	            $scope.hero = nHero;
	       }
	      };	      
	});
	*/

	
})();

