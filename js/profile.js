var profile = {
	init: function(){

	},

	buildSheet: function(hero, readonly, owner){		
		if(hero.chrname){		
			var sheet = $("<div>").addClass("panel panel-default clearfix");			
			var pHead = $('<div>').addClass('panel-heading').appendTo(sheet);
			var pHeadLbl = $("<label>").text(hero.chrname + " ~ " + hero.chrtype).addClass("read").appendTo(pHead);
			
			var div = $("<div>").addClass('form-inline edit').appendTo(pHead);
			var chrname = $("<input>").attr({'type': 'text', 'name': 'chrname'}).addClass("form-control chrname").val(hero.chrname).appendTo(div);
			$("<span>").text(" ~ ").appendTo(div);
			var chrtype = $("<input>").attr({'type': 'text', 'name': 'chrtype'}).addClass("form-control chrtype").val(hero.chrtype).appendTo(div);		
			
			var pBody = $('<div>').addClass('panel-body').appendTo(sheet);
			
			if(owner){
				var pFoot = $('<div>').addClass('panel-footer').appendTo(sheet);
				var heroId = $('<input>').addClass('heroid').prop('type', 'hidden').appendTo(sheet).val(hero.heroid);
				var buttonPanel = $("<div>").addClass('btn-group').appendTo(pFoot);
				
				var btnSave =  $("<button>").text("Save").addClass('btn btn-sm edit').appendTo(buttonPanel).click(function(){					
					$('.edit').hide();
					$('.read').show();
					//save here!
						
				});				
				var btnEdit =  $("<button>").text("Edit").addClass('btn btn-sm read').appendTo(buttonPanel).click(function(){
					$('.edit').show();
					$('.read').hide();							
				});			
				
				var btnDelete =  $("<button>").text("Delete").addClass('btn btn-sm').appendTo(buttonPanel).click(function(){					
					membersRef.child(hero.heroid).remove(function(error){								
						btnDelete.closest('.panel').remove();					
					});							
				});			
				
			}
			
			profile.buildStatTable(hero, readonly).appendTo(pBody);
			
			

			
			
			//var eqList = $("<ul>").addClass("edit").appendTo(pBody);
			
			
			
			
			
			
			
			
			for (var key in hero.equip) {
			  if (hero.equip.hasOwnProperty(key)) {
			  	var descr = key;			  	
			  	var formattedDescr = descr.replace("_", " ");
		  		$("<p>").addClass("navbar-text read").text(formattedDescr + " ("+ hero.equip[key] +")").appendTo(pBody);
		  		
		  		/*
		  		eqList.append(
		  			equip.buildEqOpt(formattedDescr, hero.equip[key], true)
		  		);
		  		*/
		  		
			  }
			}
			pBody.append(equip.buildEqSection);
			
			
					
			if(hero.rules){
				$("<p>").addClass("navbar-text").text(" ~ ").appendTo(pBody);
			}
			
			var ruleList = $("<ul>").addClass("edit").appendTo(pBody);
			for (var key in hero.rules) {
			  if (hero.rules.hasOwnProperty(key)) {
			  	var descr = hero.rules[key];
			  	var formattedDescr = descr.replace("_", " ");
		  		$("<p>").addClass("navbar-text read").text(formattedDescr).appendTo(pBody);
		  		ruleList.append(
			  		rules.buildEqOpt(formattedDescr, true)
			  	);
		  		
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
		var inp = $("<input>").attr({'type': 'text', 'name': name}).addClass("form-control edit " + name).val(value).appendTo(div);
		var p = $("<p>").addClass("navbar-text read").text(value).appendTo(div);
		(readonly? inp.hide() : p.hide());
		return row;
	}
}