var profile = {
	init: function(){

	},

	buildSheet: function(hero, readonly, owner){		
		if(hero.chrname){		
			var sheet = $("<div>").addClass("panel panel-default clearfix");			
			var pHead = $('<div>').addClass('panel-heading').appendTo(sheet);
			$("<label>").text(hero.chrname + " ~ " + hero.chrtype ).appendTo(pHead);
			var pBody = $('<div>').addClass('panel-body').appendTo(sheet);
			
			if(owner){
				var pFoot = $('<div>').addClass('panel-footer').appendTo(sheet);
				var heroId = $('<input>').addClass('heroid').prop('type', 'hidden').appendTo(sheet).val(hero.heroid);
				var buttonPanel = $("<div>").addClass('btn-group').appendTo(pFoot);
				/*
				var btnSave =  $("<button>").text("Save").addClass('btn btn-sm').appendTo(buttonPanel).hide().click(function(){
					btnSave.hide();
					btnEdit.show();				
					pBody.find("p").show();
					pBody.find("input").hide();		
					
				});				
				var btnEdit =  $("<button>").text("Edit").addClass('btn btn-sm').appendTo(buttonPanel).click(function(){
					btnEdit.hide();
					btnSave.show();		
					pBody.find("p").hide();
					pBody.find("input").show();					
				});			
				*/
				var btnDelete =  $("<button>").text("Delete").addClass('btn btn-sm').appendTo(buttonPanel).click(function(){					
					membersRef.child(hero.heroid).remove(function(error){								
						btnDelete.closest('.panel').remove();					
					});							
				});				
				//add Handler;
			}
			
			profile.buildStatTable(hero, readonly).appendTo(pBody);

			for (var key in hero.equip) {
			  if (hero.equip.hasOwnProperty(key)) {
			  	var descr = key;			  	
			  	var formattedDescr = descr.replace("_", " ");	
			  	console.log("key ", key);
			  	console.log("formattedDescr ", formattedDescr);		  	
		  		$("<p>").addClass("navbar-text").text(formattedDescr + " ("+ hero.equip[key] +")").appendTo(pBody);
			  }
			}
					
			if(hero.rules){
				$("<p>").addClass("navbar-text").text(" ~ ").appendTo(pBody);
			}

			for (var key in hero.rules) {
			  if (hero.rules.hasOwnProperty(key)) {
			  	var descr = hero.rules[key];
			  	var formattedDescr = descr.replace("_", " ");
		  		$("<p>").addClass("navbar-text").text(formattedDescr).appendTo(pBody);
			  }
			}
				
		}
		
		return sheet;
	},

	buildStatTable: function(hero, readonly){

		var mTable = $("<table>").addClass("table-responsive");
		var tHead = $("<thead>").appendTo(mTable);		
		var trH = $("<tr>").appendTo(tHead);		
		var tBody = $("<tbody>").appendTo(mTable);
		var tr = $("<tr>").appendTo(tBody);	

		trH.append($("<th>").text(""));
		trH.append($("<th>").text("M"));
		trH.append($("<th>").text("WS"));
		trH.append($("<th>").text("BS"));
		trH.append($("<th>").text("S"));
		trH.append($("<th>").text("T"));
		trH.append($("<th>").text("W"));
		trH.append($("<th>").text("I"));
		trH.append($("<th>").text("A"));
		trH.append($("<th>").text("Ld"));
		trH.append($("<th>").text("Cost"));
		
		tr.append(profile.buildTableRow('chrname', hero.chrname, readonly));
		tr.append(profile.buildTableRow('mv', hero.mv, readonly));
		tr.append(profile.buildTableRow('ws', hero.ws, readonly));
		tr.append(profile.buildTableRow('bs', hero.bs, readonly));
		tr.append(profile.buildTableRow('str', hero.str, readonly));
		tr.append(profile.buildTableRow('thg', hero.thg, readonly));
		tr.append(profile.buildTableRow('wnd', hero.wnd, readonly));
		tr.append(profile.buildTableRow('ini', hero.ini, readonly));
		tr.append(profile.buildTableRow('atk', hero.atk, readonly));
		tr.append(profile.buildTableRow('ld', hero.ld, readonly));
		tr.append(profile.buildTableRow('cost', hero.cost, readonly));

		return mTable;

	},

	buildTableRow: function(name, value, readonly){
		
		var row = $("<td>").addClass("propName");
		var div = $("<div>").addClass("form-group col-centered").appendTo(row);
		var inp = $("<input>").attr({'type': 'text', 'name': name}).addClass("form-control " + name).val(value).appendTo(div);
		var p = $("<p>").addClass("navbar-text").text(value).appendTo(div);
		(readonly? inp.hide() : p.hide());
		return row;
	}
}