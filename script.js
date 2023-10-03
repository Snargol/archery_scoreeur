
let arrow_1_1 = '0';
let arrow_1_2 = '0';
let arrow_1_3 = '0';
let total_1 = '0';
let total_set_1 = '0';


let arrow_2_1 = '0';
let arrow_2_2 = '0';
let arrow_2_3 = '0';
let total_2 = '0';
let total_set_2 = '0';

let volleyNumber = 0;


// Sélectionnez les éléments avec contenteditable et configurez des gestionnaires d'événements pour la modification en temps réel
const editableElements = document.querySelectorAll('[contenteditable="true"]');
editableElements.forEach(element => {
    element.addEventListener('input', function () {
        // Vérifiez si le contenu est vide ou non
        if (!this.textContent.trim()) {
            this.style.opacity = 0.7;
        } else {
            this.style.opacity = 1;
        }
    });
});

const setName = document.getElementById("setName");
const manualDisplay = document.getElementById("manualDisplay");
const computeVolley = document.getElementById("computeVolley");
const resetScores = document.getElementById("resetScores");
const resetAll = document.getElementById("resetAllData");
const checkboxManualMode = document.getElementById("checkBoxForManualMode");
const checkboxCompoundMode = document.getElementById("checkBoxForCompoundMode");
manualDisplay.addEventListener("click", manualMap);
computeVolley.addEventListener("click", mapVolley);
resetScores.addEventListener("click", cleanScores);
setName.addEventListener("click", updateName);
resetAll.addEventListener("click", cleanAll);
checkboxManualMode.addEventListener("change", toggleManualMode);
checkboxCompoundMode.addEventListener("change", toggleCompoundMode);

function manualMap() {
    let name1 = document.getElementById('archerName1_fill').value;
    let name2 = document.getElementById('archerName2_fill').value;
    let score1 = document.getElementById('totalScore1_fill').textContent;
    let score2 = document.getElementById('totalScore2_fill').textContent;
    let set1 = document.getElementById('setScore1_fill').textContent;
    let set2 = document.getElementById('setScore2_fill').textContent;
    let arrow11 = document.getElementById('arrow11_fill').textContent;
    let arrow12 = document.getElementById('arrow12_fill').textContent;
    let arrow13 = document.getElementById('arrow13_fill').textContent;
    let arrow21 = document.getElementById('arrow21_fill').textContent;
    let arrow22 = document.getElementById('arrow22_fill').textContent;
    let arrow23 = document.getElementById('arrow23_fill').textContent;

    document.getElementById('archerName1').value = name1;
    document.getElementById('archerName2').value = name2;
    document.getElementById('arrow11').textContent = arrow11;
    document.getElementById('arrow12').textContent = arrow12;
    document.getElementById('arrow13').textContent = arrow13;
    document.getElementById('arrow21').textContent = arrow21;
    document.getElementById('arrow22').textContent = arrow22;
    document.getElementById('arrow23').textContent = arrow23;
    document.getElementById('setScore1').textContent = set1;
    document.getElementById('setScore2').textContent = set2;
    document.getElementById('totalScore1').textContent = score1;
    document.getElementById('totalScore2').textContent = score2;
}

function mapVolley(){
    let score1 = document.getElementById('totalScore1_fill').textContent;
    let score2 = document.getElementById('totalScore2_fill').textContent;
    let arrow11 = document.getElementById('arrow11_fill').textContent;
    let arrow12 = document.getElementById('arrow12_fill').textContent;
    let arrow13 = document.getElementById('arrow13_fill').textContent;
    let arrow21 = document.getElementById('arrow21_fill').textContent;
    let arrow22 = document.getElementById('arrow22_fill').textContent;
    let arrow23 = document.getElementById('arrow23_fill').textContent;

		document.getElementById('arrow11').textContent = arrow11;
    document.getElementById('arrow12').textContent = arrow12;
    document.getElementById('arrow13').textContent = arrow13;
    document.getElementById('arrow21').textContent = arrow21;
    document.getElementById('arrow22').textContent = arrow22;
    document.getElementById('arrow23').textContent = arrow23;

		if(isCompoundMode()) {
    	computeTotalCompoundAndDisplay();
    } else {
      let totalArcher1 = parseToInt(arrow11) + parseToInt(arrow12) + parseToInt(arrow13); 
      let totalArcher2 = parseToInt(arrow21) + parseToInt(arrow22) + parseToInt(arrow23);
      
      document.getElementById('totalScore1').textContent = totalArcher1;
    	document.getElementById('totalScore2').textContent = totalArcher2;
      
      if(isFullFilledVolley() || isBarrage()){
    		computeSetsAndDisplay();
      } else {
        console.log("Pas de calcul du set, les volées ne sont pas complétées !")
      }
    }  
}

function updateName () {
    let name1 = document.getElementById('archerName1_fill').value;
    let name2 = document.getElementById('archerName2_fill').value;

    document.getElementById('archerName1').value = name1;
    document.getElementById('archerName2').value = name2;
}

function cleanAll() {
    console.log("Clean all");
    document.getElementById('arrow11').textContent = '-';
    document.getElementById('arrow12').textContent = '-';
    document.getElementById('arrow13').textContent = '-';
    document.getElementById('arrow21').textContent = '-';
    document.getElementById('arrow22').textContent = '-';
    document.getElementById('arrow23').textContent = '-';
    document.getElementById('totalScore1').textContent = '0';
    document.getElementById('totalScore2').textContent = '0';
    document.getElementById('archerName1').value = "";
    document.getElementById('archerName2').value = "";

    document.getElementById('archerName1_fill').value = "";
    document.getElementById('archerName2_fill').value = "";
    document.getElementById('setScore1_fill').textContent = '-';
    document.getElementById('setScore2_fill').textContent = '-';
    document.getElementById('arrow11_fill').textContent = '-';
    document.getElementById('arrow12_fill').textContent = '-';
    document.getElementById('arrow13_fill').textContent = '-';
    document.getElementById('arrow21_fill').textContent = '-';
    document.getElementById('arrow22_fill').textContent = '-';
    document.getElementById('arrow23_fill').textContent = '-';
    document.getElementById('totalScore1_fill').textContent = '-';
    document.getElementById('totalScore2_fill').textContent = '-';
    
    document.getElementById('arrow12_fill').setAttribute("contenteditable","true");
    document.getElementById('arrow13_fill').setAttribute("contenteditable","true");
    document.getElementById('arrow22_fill').setAttribute("contenteditable","true");
    document.getElementById('arrow23_fill').setAttribute("contenteditable","true");

    document.getElementById('arrow12_fill').style.backgroundColor = "#0E4561";
    document.getElementById('arrow13_fill').style.backgroundColor = "#0E4561";
    document.getElementById('arrow22_fill').style.backgroundColor = "#0E4561";
    document.getElementById('arrow23_fill').style.backgroundColor = "#0E4561";
    
    
    document.getElementById('totalScore1').style.backgroundColor = "#0E4561";
    document.getElementById('totalScore2').style.backgroundColor = "#0E4561";
    
    if(!isCompoundMode()) {
    	document.getElementById('setScore1').style.backgroundColor = "#0E4561";
    	document.getElementById('setScore2').style.backgroundColor = "#0E4561";
      
      document.getElementById('setScore1').textContent = '0';
    	document.getElementById('setScore2').textContent = '0';
    }
    
    volleyNumber = 0;
}

function cleanScores() {
    if(isCompoundMode()) {
			document.getElementById('arrow11').textContent = '-';
      document.getElementById('arrow12').textContent = '-';
      document.getElementById('arrow13').textContent = '-';
      document.getElementById('arrow21').textContent = '-';
      document.getElementById('arrow22').textContent = '-';
      document.getElementById('arrow23').textContent = '-';

      document.getElementById('arrow11_fill').textContent = '-';
      document.getElementById('arrow12_fill').textContent = '-';
      document.getElementById('arrow13_fill').textContent = '-';
      document.getElementById('arrow21_fill').textContent = '-';
      document.getElementById('arrow22_fill').textContent = '-';
      document.getElementById('arrow23_fill').textContent = '-';
    } else {
      document.getElementById('arrow11').textContent = '-';
      document.getElementById('arrow12').textContent = '-';
      document.getElementById('arrow13').textContent = '-';
      document.getElementById('arrow21').textContent = '-';
      document.getElementById('arrow22').textContent = '-';
      document.getElementById('arrow23').textContent = '-';
      document.getElementById('totalScore1').textContent = '0';
      document.getElementById('totalScore2').textContent = '0';

      document.getElementById('arrow11_fill').textContent = '-';
      document.getElementById('arrow12_fill').textContent = '-';
      document.getElementById('arrow13_fill').textContent = '-';
      document.getElementById('arrow21_fill').textContent = '-';
      document.getElementById('arrow22_fill').textContent = '-';
      document.getElementById('arrow23_fill').textContent = '-';
      document.getElementById('totalScore1_fill').textContent = '-';
      document.getElementById('totalScore2_fill').textContent = '-';
    }
}

function parseToInt(score) {
    if (score === 'X') {
        return 10;
    } else if (score === 'M') {
        return 0;
    } else if (isNaN(score)) {
        return 0;
    } else if (score === undefined) {
        return 0;
    }  else if (score === null) {
        return 0;
    }  else if (score === "") {
        return 0;
    } else {
        return parseInt(score);
    }
}

function isFullFilledVolley() {
		return document.getElementById('arrow11').textContent != '-' &&
  	document.getElementById('arrow12').textContent != '-' &&
  	document.getElementById('arrow13').textContent != '-' &&
  	document.getElementById('arrow21').textContent != '-' &&
    document.getElementById('arrow22').textContent != '-' &&
    document.getElementById('arrow23').textContent != '-' &&
    document.getElementById('arrow11').textContent != null &&
  	document.getElementById('arrow12').textContent != null &&
  	document.getElementById('arrow13').textContent != null &&
  	document.getElementById('arrow21').textContent != null &&
    document.getElementById('arrow22').textContent != null &&
    document.getElementById('arrow23').textContent != null &&
    document.getElementById('arrow11').textContent != undefined &&
  	document.getElementById('arrow12').textContent != undefined &&
  	document.getElementById('arrow13').textContent != undefined &&
  	document.getElementById('arrow21').textContent != undefined &&
    document.getElementById('arrow22').textContent != undefined &&
    document.getElementById('arrow23').textContent != undefined;
}

function isBarrage() {
  if(isCompoundMode()) {
		return (volleyNumber === 5 && parseInt(document.getElementById('totalScore1').textContent) === parseInt(document.getElementById('totalScore2').textContent));
  } else {
  	sets1 = parseInt(document.getElementById('setScore1').textContent == '-' 
    									? 0 : document.getElementById('setScore1').textContent);
    sets2 = parseInt(document.getElementById('setScore2').textContent == '-' 
                        ? 0 : document.getElementById('setScore2').textContent);

    return sets1 === 5 && sets2 === 5;
  }
}

function isBarrageFullFilled() {
  return document.getElementById('arrow11').textContent != '-' &&
      document.getElementById('arrow21').textContent != '-' &&
      document.getElementById('arrow11').textContent != null &&
      document.getElementById('arrow21').textContent != null &&
      document.getElementById('arrow11').textContent != undefined &&
      document.getElementById('arrow21').textContent != undefined;
}

function computeTotalCompoundAndDisplay() {
	let arrow11 = document.getElementById('arrow11').textContent;
  let arrow12 = document.getElementById('arrow12').textContent;
  let arrow13 = document.getElementById('arrow13').textContent;
  let arrow21 = document.getElementById('arrow21').textContent;
  let arrow22 = document.getElementById('arrow22').textContent;
  let arrow23 = document.getElementById('arrow23').textContent;
  
	if(isFullFilledVolley() || isBarrage()) {
  	if(isBarrage()) {
    	if(parseToInt(arrow11) > parseToInt(arrow21)) {
      	document.getElementById('totalScore1').style.backgroundColor = "#FFD700";
        document.getElementById('totalScore2').style.backgroundColor = "#C0C0C0"; 
      } else if(parseToInt(arrow11) < parseToInt(arrow21)){
      	document.getElementById('totalScore1').style.backgroundColor = "#C0C0C0";
        document.getElementById('totalScore2').style.backgroundColor = "#FFD700"; 
      } else {
      	var archer1Won = document.createElement("button");
          archer1Won.textContent = document.getElementById('archerName1').value + " : Vainqueur du barrage";
          archer1Won.style.width = "300px";
          archer1Won.style.height = "80px";
          archer1Won.style.marginTop = "10px";
          archer1Won.style.fontWeight = "bold";
          archer1Won.style.fontSize = "150%";

          var archer2Won = document.createElement("button");
          archer2Won.textContent = document.getElementById('archerName2').value + " : Vainqueur du barrage";
          archer2Won.style.width = "300px";
          archer2Won.style.height = "80px";
          archer2Won.style.marginTop = "10px";
          archer2Won.style.fontWeight = "bold";
          archer2Won.style.fontSize = "150%";

          var shootOffDiv = document.getElementById('shootOffDiv');

          shootOffDiv.appendChild(archer1Won);
          shootOffDiv.appendChild(archer2Won);
          
          archer1Won.addEventListener("click", function() {
            shootOffDiv.removeChild(archer1Won);
            shootOffDiv.removeChild(archer2Won);
            
            document.getElementById('arrow12_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow13_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow22_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow23_fill').setAttribute("contenteditable","true");

            document.getElementById('arrow12_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow13_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow22_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow23_fill').style.backgroundColor = "#0E4561";
            
            document.getElementById('totalScore1').style.backgroundColor = "#FFD700";
            document.getElementById('totalScore2').style.backgroundColor = "#C0C0C0";
          });

          archer2Won.addEventListener("click", function() {
            shootOffDiv.removeChild(archer1Won);
            shootOffDiv.removeChild(archer2Won);

						document.getElementById('arrow12_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow13_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow22_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow23_fill').setAttribute("contenteditable","true");

            document.getElementById('arrow12_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow13_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow22_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow23_fill').style.backgroundColor = "#0E4561";
            
            document.getElementById('totalScore1').style.backgroundColor = "#C0C0C0";
            document.getElementById('totalScore2').style.backgroundColor = "#FFD700";  
          });
      }
    } else {
      let totalCompoundArcher1 = parseInt(document.getElementById('totalScore1').textContent);
      let totalCompoundArcher2 = parseInt(document.getElementById('totalScore2').textContent);

			totalCompoundArcher1 += parseToInt(arrow11) + parseToInt(arrow12) + parseToInt(arrow13); 
      totalCompoundArcher2 += parseToInt(arrow21) + parseToInt(arrow22) + parseToInt(arrow23);
      
      document.getElementById('totalScore1').textContent = totalCompoundArcher1;
      document.getElementById('totalScore2').textContent = totalCompoundArcher2;
    }
    
    volleyNumber++;

    if(isBarrage()) {
        document.getElementById('arrow12_fill').setAttribute("contenteditable","false");
        document.getElementById('arrow13_fill').setAttribute("contenteditable","false");
        document.getElementById('arrow22_fill').setAttribute("contenteditable","false");
        document.getElementById('arrow23_fill').setAttribute("contenteditable","false");

				document.getElementById('arrow12_fill').style.backgroundColor = "#a0a0a0";
        document.getElementById('arrow13_fill').style.backgroundColor = "#a0a0a0";
        document.getElementById('arrow22_fill').style.backgroundColor = "#a0a0a0";
        document.getElementById('arrow23_fill').style.backgroundColor = "#a0a0a0";

				document.getElementById('arrow12_fill').textContent = "-";
        document.getElementById('arrow13_fill').textContent = "-";
        document.getElementById('arrow22_fill').textContent = "-";
        document.getElementById('arrow23_fill').textContent = "-";
    	} else {
				document.getElementById('arrow12_fill').setAttribute("contenteditable","true");
        document.getElementById('arrow13_fill').setAttribute("contenteditable","true");
        document.getElementById('arrow22_fill').setAttribute("contenteditable","true");
        document.getElementById('arrow23_fill').setAttribute("contenteditable","true");

				document.getElementById('arrow12_fill').style.backgroundColor = "#0E4561";
        document.getElementById('arrow13_fill').style.backgroundColor = "#0E4561";
        document.getElementById('arrow22_fill').style.backgroundColor = "#0E4561";
        document.getElementById('arrow23_fill').style.backgroundColor = "#0E4561";
    	}
  } else {
    console.log("Pas de calcul du total compound, les volées ne sont pas complétées !")
  }
}

function computeSetsAndDisplay(){
    totalScore1 = parseInt(document.getElementById('totalScore1').textContent);
    totalScore2 = parseInt(document.getElementById('totalScore2').textContent);
    sets1 = parseInt(document.getElementById('setScore1').textContent == '-' 
    									? 0 : document.getElementById('setScore1').textContent);
    sets2 = parseInt(document.getElementById('setScore2').textContent == '-' 
    									? 0 : document.getElementById('setScore2').textContent);


		if(isBarrage()) {
    	if(!isBarrageFullFilled()) {
      	console.error("Le barrage n'est pas complété complètement, pas de calcul du set");
        return;
      }
      
    	if (totalScore1 > totalScore2) {
          sets1 += 1
      } else if (totalScore2 > totalScore1) {
          sets2 += 1
      } else {
          var archer1Won = document.createElement("button");
          archer1Won.textContent = document.getElementById('archerName1').value + " : Vainqueur du barrage";
          archer1Won.style.width = "300px";
          archer1Won.style.height = "80px";
          archer1Won.style.marginTop = "10px";
          archer1Won.style.fontWeight = "bold";
          archer1Won.style.fontSize = "150%";

          var archer2Won = document.createElement("button");
          archer2Won.textContent = document.getElementById('archerName2').value + " : Vainqueur du barrage";
          archer2Won.style.width = "300px";
          archer2Won.style.height = "80px";
          archer2Won.style.marginTop = "10px";
          archer2Won.style.fontWeight = "bold";
          archer2Won.style.fontSize = "150%";

          var shootOffDiv = document.getElementById('shootOffDiv');

          shootOffDiv.appendChild(archer1Won);
          shootOffDiv.appendChild(archer2Won);
          
          archer1Won.addEventListener("click", function() {
          	sets1 = parseInt(document.getElementById('setScore1').textContent == '-' 
    									? 0 : document.getElementById('setScore1').textContent);

            sets1 += 1;
            shootOffDiv.removeChild(archer1Won);
            shootOffDiv.removeChild(archer2Won);
            document.getElementById('setScore1').textContent = sets1;
            document.getElementById('arrow12_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow13_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow22_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow23_fill').setAttribute("contenteditable","true");

            document.getElementById('arrow12_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow13_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow22_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow23_fill').style.backgroundColor = "#0E4561";
            
            document.getElementById('setScore1').style.backgroundColor = "#FFD700";
            document.getElementById('setScore2').style.backgroundColor = "#C0C0C0";
          });

          archer2Won.addEventListener("click", function() {
            sets2 = parseInt(document.getElementById('setScore2').textContent == '-' 
    									? 0 : document.getElementById('setScore2').textContent);
            sets2 += 1;
            shootOffDiv.removeChild(archer1Won);
            shootOffDiv.removeChild(archer2Won);
            document.getElementById('setScore2').textContent = sets2;
            document.getElementById('arrow12_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow13_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow22_fill').setAttribute("contenteditable","true");
            document.getElementById('arrow23_fill').setAttribute("contenteditable","true");

            document.getElementById('arrow12_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow13_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow22_fill').style.backgroundColor = "#0E4561";
            document.getElementById('arrow23_fill').style.backgroundColor = "#0E4561";
            
            document.getElementById('setScore1').style.backgroundColor = "#C0C0C0";
            document.getElementById('setScore2').style.backgroundColor = "#FFD700";  
          });
      }
    } else {
    	if (totalScore1 > totalScore2) {
          sets1 += 2;
      } else if (totalScore2 > totalScore1) {
          sets2 += 2;
      } else {
          sets1++;
          sets2++;
      }
    }
    
    document.getElementById('setScore1').textContent = sets1;
    document.getElementById('setScore2').textContent = sets2;

    if(isBarrage()) {
        document.getElementById('arrow12_fill').setAttribute("contenteditable","false");
        document.getElementById('arrow13_fill').setAttribute("contenteditable","false");
        document.getElementById('arrow22_fill').setAttribute("contenteditable","false");
        document.getElementById('arrow23_fill').setAttribute("contenteditable","false");

				document.getElementById('arrow12_fill').style.backgroundColor = "#a0a0a0";
        document.getElementById('arrow13_fill').style.backgroundColor = "#a0a0a0";
        document.getElementById('arrow22_fill').style.backgroundColor = "#a0a0a0";
        document.getElementById('arrow23_fill').style.backgroundColor = "#a0a0a0";

				document.getElementById('arrow12_fill').textContent = "-";
        document.getElementById('arrow13_fill').textContent = "-";
        document.getElementById('arrow22_fill').textContent = "-";
        document.getElementById('arrow23_fill').textContent = "-";
    } else {
				document.getElementById('arrow12_fill').setAttribute("contenteditable","true");
        document.getElementById('arrow13_fill').setAttribute("contenteditable","true");
        document.getElementById('arrow22_fill').setAttribute("contenteditable","true");
        document.getElementById('arrow23_fill').setAttribute("contenteditable","true");

				document.getElementById('arrow12_fill').style.backgroundColor = "#0E4561";
        document.getElementById('arrow13_fill').style.backgroundColor = "#0E4561";
        document.getElementById('arrow22_fill').style.backgroundColor = "#0E4561";
        document.getElementById('arrow23_fill').style.backgroundColor = "#0E4561";
    }
        
    if(sets1 === 6) {
        document.getElementById('setScore1').style.backgroundColor = "#FFD700";
        document.getElementById('setScore2').style.backgroundColor = "#C0C0C0";
    }

    if(sets2 === 6) {
				document.getElementById('setScore1').style.backgroundColor = "#C0C0C0";
        document.getElementById('setScore2').style.backgroundColor = "#FFD700";    
    }
    
    volleyNumber++;

    return [sets1, sets2]
}

function toggleManualMode() {
	const checkbox = document.getElementById("checkBoxForManualMode");
	if(checkbox.checked){
  	document.getElementById("manualDisplay").disabled = true;
    document.getElementById("computeVolley").disabled = false;
    document.getElementById('setScore1_fill').setAttribute("contenteditable","false");
    document.getElementById('setScore2_fill').setAttribute("contenteditable","false");
  } else {
  	document.getElementById("manualDisplay").disabled = false;
    document.getElementById("computeVolley").disabled = true;
    document.getElementById('totalScore1_fill').setAttribute("contenteditable","true");
    document.getElementById('totalScore2_fill').setAttribute("contenteditable","true");
    document.getElementById('setScore1_fill').setAttribute("contenteditable","true");
    document.getElementById('setScore2_fill').setAttribute("contenteditable","true");
  }
}

function isCompoundMode() {
	return document.getElementById("checkBoxForCompoundMode").checked;
}

function toggleCompoundMode() {
	const checkbox = document.getElementById("checkBoxForCompoundMode");
	if(checkbox.checked){
  	document.getElementById('setScore1').style.backgroundColor = "red";
    document.getElementById('setScore2').style.backgroundColor = "red";
    document.getElementById('setScore1').textContent = "";
    document.getElementById('setScore2').textContent = "";
  } else {
  	document.getElementById('setScore1').style.backgroundColor = "#0E4561";
    document.getElementById('setScore2').style.backgroundColor = "#0E4561";
    document.getElementById('setScore1').textContent = "0";
    document.getElementById('setScore2').textContent = "0";
  }
}