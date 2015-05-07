angular
	.module('darkcorners')
	.factory("heroes", function(){
	    var heroes = [{
	    	name: "Will", 
	    	type: "slow", 
	    	mv: 4,
	    	ws: 3,
	    	bs: 3,
	    	str: 3, 
	    	thg: 3, 
	    	wnd: 1, 
	    	ini: 3, 
	    	atk: 1, 
	    	ld: 7, 
	    	px: 0, 
	    	cost: 25,
	    	rules: [{
	    		id: 1,
	    		descr: "Leader"
	    	},{
	    		id: 2,
	    		descr: "Strongman"
	    	}],
	    	items: [{ 
	    		id: 1,
	        	weapon: "Dagger",
	        	cost: "Free"
	        }]
	    },{ name: "Laura",
	    	type: "fast",
	    	mv: 4,
	    	ws: 3,
	    	bs: 3,
	    	str: 3, 
	    	thg: 3, 
	    	wnd: 1, 
	    	ini: 3, 
	    	atk: 1, 
	    	ld: 7, 
	    	px: 0, 
	    	cost: 25,
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