const BASEURL = "https://mordheim.firebaseio.com";
const WARBANDS_LOCATION = "warbands";
const USERS_LOCATION = "users";
const MEMBERS_LOCATION = "members";

var rootRef;
var warbandRef;
var userRef;
var membersRef;

// The $ is now locally scoped 
$(function() {
  // The DOM is ready!
  app.init();  
  equip.init();
  rules.init();  
})


/*
var selIds = function(){		
		var arr = [];
		var list = arr.unique1();
		return{
			getList: function(){
				return list;
			},
			pushEl: function(el){								
				list.push(el);
				
			},
			popEl: function(el){				
				var i = list.indexOf(el);
				if(i != -1) {
					list.splice(i, 1);
				}
			},
			clear: function(){
				list = arr.unique1();
			}
		}		
	}();
	*/
	
var equip = {

	list: $("#eqlist ul"),

	init: function(){
		$("#wadd").click(equip.add);	
		/*
		equip.list.append(	
		 	equip.buildEqOpt("Dagger","Free", false)
		);
		*/
	},

	buildEqOpt: function(wname, wcost, removable){
		var li = $("<li>");
		$("<span>").addClass("wname").text(wname).appendTo(li);
		$("<span>").text(" - ").appendTo(li);
		$("<span>").addClass("wcost").text(wcost).appendTo(li);
		$("<span>").text(" ").appendTo(li);	
		if(removable){
			var btn = $("<button>").addClass("btn btn-default btn-xs").appendTo(li);
			var trashIco = $("<span>").addClass("glyphicon glyphicon-trash").appendTo(btn);
			btn.on("click", equip.remove);
		}		
		return li;
	},

	add: function(){	
		var name = $("#wname").val();
		var cost = $("#wcost").val()
		if(name != "" && cost != ""){
			equip.list.append(	
				equip.buildEqOpt(name, cost, true)
			);
			$("#wname, #wcost").val("");
		}

	},

	remove: function(){		
		$(this).closest("li").remove();
	},

	serData: function(){
		var list = {};  
		  $('#eqlist ul li').each(function(){
		  	var wname = $(this).find(".wname").text();		  	
		  	var	wnameStrip = wname.replace(/\s+/g, '_');
		  	var wcost = $(this).find(".wcost").text();
		  	list[wnameStrip] = wcost;
		  });		
		return list;
	}
}

var rules = {

	list: $("#ruleslist ul"),

	init: function(){
		$("#radd").click(rules.add);			
	},

	buildEqOpt: function(rname, removable){
		var li = $("<li>");
		$("<span>").addClass("rname").text(rname).appendTo(li);
		$("<span>").text(" ").appendTo(li);
		if(removable){
			var btn = $("<button>").addClass("btn btn-default btn-xs").appendTo(li);
			var trashIco = $("<span>").addClass("glyphicon glyphicon-trash").appendTo(btn);
			btn.on("click", rules.remove);
		}		
		return li;
	},

	add: function(){	
		var name = $("#rname").val();
		if(name != ""){
			rules.list.append(	
				rules.buildEqOpt(name, true)
			);
			$("#rname").val("");
		}
	},

	remove: function(){		
		$(this).closest("li").remove();
	},

	serData: function(){	
		var list = {};  
		  $('#ruleslist ul li').each(function(){
		  	var rname = $(this).find(".rname").text();	
		  	var wnameStrip = rname.replace(/\s+/g, '_'); 	
		  	list[wnameStrip] = wnameStrip;
		  });		
		return list;
	}
}

var app = {
	init: function(){		 
		 rootRef = new Firebase(BASEURL);
		 warbandRef = rootRef.child(WARBANDS_LOCATION);
		 userRef = rootRef.child(USERS_LOCATION);
		 membersRef = rootRef.child(MEMBERS_LOCATION);
		 $("#chrAddMember").click(app.addMember);				
		 $("#chrRetrieve").click(app.retrieve);	
		 $("#saveNewWar").click(app.saveNewWar);	 
		 $("#deleteWar").click(app.deleteWar);
		 $("#updateWar").click(app.updateWar);
	},
	
	updateWar: function(){
		var $btn = $(this).button('loading');
		var currentWar = sessionStorage.getItem("warid");		
		var warname = $('.warname').val();
		var wartype = $('.wartype').val();
		warbandRef.child(currentWar).update({'name' : warname, 'type': wartype}, function(error) {
		  if (error) {
			    console.log('Synchronization failed');
			  } else {				  
			    console.log('Synchronization succeeded');
			  }			  
			  $btn.button('reset');
		});	
	
	},
	
	updateHero: function(hero){
		membersRef.child(hero.id).update({}, function(error){
			
		})
	},
	
	deleteWar: function(){		
		var currentWar = sessionStorage.getItem("warid");		
		warbandRef.child(currentWar).remove(function(){
			window.location.href = '#/home';	
		});				
	},
	
	saveNewWar: function(){
		var user = rootRef.getAuth();	
		var warname = $("#warname").val();						
		var wartype = $("#wartype").val();	
		var ownerName;	
		userRef.child(user.uid).once('value', function(snap) {
			snap.forEach(function(data){
        	   ownerName = data.val();
			});         
            
           if (ownerName && warname != ""){
        	   var warbObj = {
              		'name' : warname,
              		'type' : wartype,
              		'owner' : user.uid,
              		'ownername' : ownerName                  		        		
    			};				
    			warbandRef.push(warbObj); 
            }     
        });
		userRef.off();
	},

	addMember: function(){
		var jsonData = $("#frmDetail").serializeObject();
		var warid = $("#frmDetail").attr("warid");		
		var newPostRef = membersRef.push(jsonData);	
		app.getMembersList(sessionStorage.getItem("userid"), warid);

		var postID = newPostRef.key();
		var equipRef = membersRef.child(postID).child("equip");

		var genEqp = equip.serData();
		if (typeof genEqp != "undefined") {
			equipRef.set(genEqp);	
		}
	
		var rulesRef = membersRef.child(postID).child("rules");
		var genRules = rules.serData();		 
		if(typeof genRules != "undefined"){
			rulesRef.set(genRules);	
		}		

		$("#addHeroPanel input").val("");
		$("#eqlist ul").empty();
		$("#ruleslist ul").empty();
	},
	
	
	getMembersList: function(ownerId, warId){		
		var isOwner = false;
		var user = rootRef.getAuth();
		$("#ownerid, #warid").val("");
		if(user.uid === ownerId){
			$("#addHeroPanel, #warbandPanel").show();
			$("#ownerid").val(ownerId);
			$("#warid").val(warId);
			isOwner = true;
			
			warbandRef.child(warId).once('value', function(snap){
				var attr = snap.val();
				$('.warname').val(attr.name);
				$('.wartype').val(attr.type);
			});
			
			
		}		
		$('#heroList').empty();
		membersRef.once("value", function(snapshot){
			var snap = snapshot.val();
			for(var index in snap){
				var attr = snap[index];
				if(attr.warid == warId){
					attr.heroid = index;
					$("#heroList").prepend(profile.buildSheet(attr, true, isOwner));
				}
			}
		});		
	},
	
   	getWarbandList: function(){   		
   		var user = "";   	  		
   		var list = $("#warlist").empty();
   		warbandRef.once("value", function(snapshot){	  			     			
			var snap = snapshot.val();
			for(var index in snap){			
				var owner = snap[index].ownername;			
				var ownerId = snap[index].owner;			
				var warname = snap[index].name;
				var wartype = snap[index].type;				
				var div = $("<a>").attr("href", "#/detail/" + index + "/" + ownerId ).addClass("list-group-item").appendTo(list);						    					
				$("<h3>").addClass("list-group-item-heading").text(owner).appendTo(div);
				$("<p>").addClass("list-group-item-text").text(warname + " - " + wartype).appendTo(div);
			}
			
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
   	}
}



