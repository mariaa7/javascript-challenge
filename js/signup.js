/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

function Function() {
	var elem = document.getElementById("state");
	for (var i = 0; i < usStates.length; i++) {
		var option = document.createElement("option");
		option.value = usStates[i].code;
		var t = document.createTextNode(usStates[i].name);
		option.appendChild(t);
		elem.appendChild(option);
	}

	//var occup = document.getElementById("occupation");
	//occup.addEventListener('change', selectOccup);
}

/*function selectOccup(evt) {
	var elem = document.getElementById("occupation");
}*/

document.addEventListener('DOMContentLoaded', Function);
