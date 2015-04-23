 $(function() {
      // The DOM is ready!
      editor.init();  
  });

var points = {
  attributi: [5, 4, 3],
  abilita: [11, 7, 4]
};

var pg = {
        charId: "",  
        identita: { 
          cognome: "",
          concetto: "",
          difesa: "",
          eta: "",
          iniziativa: "",
          moralita: "",
          nome: "",
          salute: "",
          sesso: "",
          taglia: "",
          template: "",
          velocita: "",
          virtu: "",
          vizio: "",
          volonta: "",
          giocatore: ""
        },
        attributi:{
        	mentali:[],
        	fisiche:[],
        	sociali:[]
        },
        elencoabilita:{
        	mentali:[],
        	fisiche:[],
        	sociali:[]
        },
        talenti:[]
  };

var baseUrl = "https://resplendent-inferno-7420.firebaseio.com";


var ssel = {
  returnHtmlObj : function(compCat, compId, compVal){
    var component = $('<div>').addClass('input-group skillEditValue right');
    var spanPl = $('<span>').addClass('input-group-btn').appendTo(component);
    $('<button>').addClass('btn btn-default').text('-').appendTo(spanPl).on('click', ssel.remove);
    $('<input>').addClass('form-control').attr({'cat': compCat, 'id': compId}).val(compVal).appendTo(component);
    var spanMn = $('<span>').addClass('input-group-btn').appendTo(component);
    $('<button>').addClass('btn btn-default').text('+').appendTo(spanMn).on('click', ssel.add);

    return component;
  },

  add: function(){   
   var currValue = $(this).parent().siblings('input').val()*1;
   currValue++;
   $(this).parent().siblings('input').val(currValue);   
  },

  remove: function(){    
    var currValue = $(this).parent().siblings('input').val()*1;
    currValue--;
    if(currValue < 0 ){
      currValue = 0;
    }
    $(this).parent().siblings('input').val(currValue);  
  }
}

var editor = {

	init: function(){           

        $(".attributes .mental").append(editor.buildAttributeSelector('mentali'));
        $(".attributes .phisical").append(editor.buildAttributeSelector('fisiche'));
        $(".attributes .social").append(editor.buildAttributeSelector('sociali'));

        $(".abilities .mental").after(editor.buildAbilitySelector('mentali'));                              
        $(".abilities .phisical").after(editor.buildAbilitySelector('fisiche'));
        $(".abilities .social").after(editor.buildAbilitySelector('sociali'));
        $(".merits").after(editor.buildTalentSelector);

        $('#save').click(editor.save);   
    },

    save: function(){
    	/*
    	Attributi 5/4/3 􏰀 Abilità 11/7/4 (+3 Specializzazioni) 􏰀 
    	Pregi 7 􏰀 (Comprare il quinto pallino in qualsiasi area costa due punti) 􏰀   	   	   	
    	Difesa = Il valore più basso tra Prontezza e Destrezza 􏰀 
    	*/

      pg.identita.nome = $('#name').val();
    	pg.identita.cognome = $('#surname').val();
    	pg.identita.concetto = $('#concept').val();
    	pg.identita.giocatore = $('#player').val();
    	pg.identita.sesso = $('#sesso').val();
    	pg.identita.moralita = 7;
    	pg.identita.velocita = $('#For').val()*1 + $('#Des').val()*1 + 5;
    	pg.identita.taglia = 5;
    	pg.identita.salute = $('#Cos').val()*1 + pg.identita.taglia;
    	pg.identita.iniziativa = $('#Des').val()*1 + $('#Aut').val()*1;
    	pg.identita.volonta = $('#Fer').val()*1 + $('#Aut').val()*1;
      var pro = $('#Pro').val()*1;
      var des = $('#Des').val()*1;
      pg.identita.difesa = (pro < des ? pro : des);

    	$.each( $(".attributes input"), function(){  			
  			var cat = $(this).attr('cat');
  			var tVal = $(this).val();
  			var tLbl = $(this).parent().siblings('span').text();
  			pg.attributi[cat].push({
                id: $(this).attr('id'), 
                nome: tLbl,
                valore: tVal
            });
		});

		$.each( $(".abilities input"), function(){  			
  			var cat = $(this).attr('cat');
  			var tVal = $(this).val();
  			var tLbl = $(this).parent().siblings('span').text();
  			if(tVal > 0){
  				var specList = $(this).parent().siblings('.specList');
  				var skill = { "nome": "", "valore": "", "specialization": []};
  				
  				$.each( specList.find("input:checked"), function(){  					
  					var spn = $(this).siblings('span');
  					var inp = $(this).siblings('input');  					
  					skill.specialization.push({"id": spn.attr("spId"), "nome": spn.text()});
  				});
  				skill.nome = tLbl;
  				skill.valore = tVal;  				
	  			pg.elencoabilita[cat].push(skill);
        }
		});	

		$.each( $(".talents input:checked"), function(){  			
  			var cat = $(this).attr('cat');
  			var tVal = $(this).siblings('span').attr('val');
  			var tLbl = $(this).parent().siblings('span').text();

  			pg.talenti.push({
                "nome": tLbl,
                "valore": tVal
            });
		});

		//$('#well').text(JSON.stringify(pg, null, '\t'));
    /*
      var ref = new Firebase(baseUrl + "/counter");
      ref.once("value", function(snap) {
        var cnt = snap.val();        
        cnt++;
        ref.set(cnt);
        pg.charId = 'CHR'+ cnt;                
      });
    */

      var myDataRef  = new Firebase(baseUrl + "/pg"); 
      console.log('pg ', pg);
      myDataRef.push(pg);
      var postID = myDataRef.key();
      console.log('postID ', postID);

    },

    buildTalentSelector: function(){
    	var ul = $("<ul>").addClass('talents');   
		for (var i = talents.length - 1; i >= 0; i--) {
   			var talent = talents[i];
   			var li = $('<li>').addClass('').appendTo(ul);
		    $('<input>').attr({'type':'checkbox', 'cat':talent._categoria}).css('margin-right', '5px').appendTo(li);

		    if(talent._minValue != talent._maxValue){
		    	$('<span>').attr('val', talent._minValue + "~" + talent._maxValue).text(talent._nome + " [" + talent._minValue + "~" + talent._maxValue +"]").appendTo(li);	     	
		    }else{
		    	$('<span>').attr('val', talent._minValue).text(talent._nome + " [" + talent._minValue + "]").appendTo(li);	     
		    }		    
		};

		//$("<li><div class='list-group'><p class='list-group-item-heading'>List group item heading</p><p class='list-group-item-text'>Lorem Ipsum Dolor</p></div></li>").appendTo(ul);

		return ul;
    },

	buildAbilitySelector: function(category){	

		var ul = $("<ul>").addClass('');   
		for (var i = skills.length - 1; i >= 0; i--) {
	        var skill = skills[i];
	        if(skill._cat == category){
	            var li = $('<li>').addClass('skill').appendTo(ul);
	            $('<span>').addClass('skillName left').attr('id', skill._id).text(skill._descr).appendTo(li).click(function(){
		        	 $(this).siblings('.specList').toggleClass('hidden');	        	
		          });       	           
              
              li.append(ssel.returnHtmlObj(skill._cat, ''));

		        var specList = $('<ul>').addClass('specList hidden').appendTo(li);      

		        for (var j = skill.elencospec.spec.length - 1; j >= 0; j--) {
		        	var currSpec = skill.elencospec.spec[j];
		        	var specEl = $('<li>').addClass('spec').appendTo(specList);
		        	$('<input>').css('margin-right', '5px').attr('type', 'checkbox').appendTo(specEl);
		        	$('<span>').attr('spId', currSpec._id).text(currSpec._descr).appendTo(specEl);	        	
		        };

				var cusEl = $('<li>').addClass('spec').appendTo(specList);
		        $('<input>').css('margin-right', '5px').attr('type', 'checkbox').appendTo(cusEl);
		        $('<input>').attr('spId', currSpec._id).text("").appendTo(cusEl);	        	

	        }     
	    };

	    return ul;
	},

  buildAttributeSelector: function(category){
    var ul = $("<ul>").addClass('');   
    for (var i = attrib.length - 1; i >= 0; i--) {
      var skill = attrib[i];
      if(skill._cat == category){        
        var li = $('<li>').addClass('skill').appendTo(ul);
        $('<span>').addClass('skillName left').text(skill._descr).appendTo(li);
        li.append(ssel.returnHtmlObj(skill._cat, skill._id, skill._val));
      }
    }
    return ul;
  },

	addSkill: function(category){	
				
		var skill = $("#ab_mentali").val();
		var label = $('#ab_mentali option:selected').val();
		var newValue = $("#abval_mentali").val();

		var cVal = $("#charList").val();
        var currChr = $.grep(personaggi, function(e){ return e.charId == cVal; }); 
        console.log(currChr);
        currChr[0].elencoabilita.mentali.push({'_id': skill, 'nome': label, 'valore': newValue});


	}

}