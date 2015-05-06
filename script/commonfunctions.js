
	function arrayObjectIndexOf(myArray, searchTerm, property) {
	    for(var i = 0, len = myArray.length; i < len; i++) {
	        if (myArray[i][property] === searchTerm) return i;
	    }
	    return -1;
	}

	function simpleRoll(diceNr){
		if(diceNr > 1){
			var result = [];						
			for (var i=0; i<diceNr; i++) {	
				result.push(Math.floor((Math.random()*10)+1));		
			}
		}else{
			var result = Math.floor((Math.random()*10)+1);
		}
		//console.log("simpleRoll result :" + result);
		return result;				
	}


	function roll(diceNr, threshold, rerollValue){
		var result = {"successes":0,"rolls":[]};

		if(!threshold){
			threshold = 8;
		}
		if(!rerollValue){
			rerollValue = 10;
		}

		var chanceRoll = false;
		if(diceNr == 1){
			chanceRoll = true;
		}

		for (var i=0; i<diceNr; i++) {	
			var roll = 	Math.floor((Math.random()*10)+1);
			var rollType = "miss";				
			if(roll >= threshold){
				rollType = "success";
				if(roll >= rerollValue){
					diceNr++; 
					rollType = "reroll"; //questo non è prettamente un reroll, è la concessione di un reroll
				}
				result.successes += 1;
			}
			if(roll == 1 && chanceRoll){
				rollType = "critFailure";
			}
			result.rolls.push({"roll":roll, "rollType": rollType});		
		}	

		return result;					
	}

	function getAttributeValue(attributeList, attributeName){
		//console.log("Fnc: getAttributeValue");
		for(var i=0; i<attributeList.length; i++){			
			if(attributeList[i].nome == attributeName){
				//console.log(attributeName + ": " + attributeList[i].valore);
				return attributeList[i].valore*1;
			}
		}
		console.log(attributeName + " not found");
		return -1;
	}
