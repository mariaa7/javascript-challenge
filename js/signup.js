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

	var occup = document.getElementById("occupation");
	occup.addEventListener('change', selectOccup);

	var button = document.getElementById('cancelButton');
	button.addEventListener('click', cancel);

	var form = document.getElementById('signup');
	form.addEventListener('submit', submit);
}

function submit(evt) {
	var valid = validate(this);

	if (!valid && evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = valid;
	return valid;
}

function selectOccup() {
	var other = document.getElementById("occupation-other")
	if (this.value == "other") {
		other.style.display = 'block';
	} else {
		other.value = "";
		other.style.display = 'none';
	}
}

function cancel() {
	if (window.confirm('Do you really want to leave this page?')) {
		window.location.href = 'http://google.com/';
	}
}

function validate(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	var valid = true;
	for (var i = 0; i < requiredFields.length; i++) {
		valid &= validateField(requiredFields[i], form);
	}

	var birthdate = document.getElementById('birthdate').value;
	valid &= validateBirthdate(birthdate, form);

	var zip = document.getElementById('zip').value;
	valid &= validateZip(zip, form);

	var occupation = document.getElementById('occupation').value;
	if (occupation == "other") {
		valid &= validateField('occupation-other', form);
	}

	return valid;
}

function validateField(field, form) {
	if (0 == form[field].value.trim().length) {
		form[field].className = 'form-control invalid';
		return false;
	} else {
		form[field].className = 'form-control';
		return true;
	}
}

function validateBirthdate(birthdate, form) {
	var currDate = new Date();
	var currYear = currDate.getFullYear();
	var currMonth = currDate.getMonth();
	var currDay = currDate.getDate();
	var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
	var sep = birthdate.match(pattern);
	if (sep == null) {
		form['birthdate'].className = 'form-control invalid';
		return false;
	}
	birthdate = new Date(sep[3], sep[1] - 1, sep[2]);
	var year = birthdate.getFullYear();
	var age = currYear - year;
	var month = birthdate.getMonth();
	var day = birthdate.getDate();
	if (currMonth < month || month == currMonth 
		&& currDay < day) {
		age--;
	}
	if (age < 13) {
		form['birthdate'].className = 'form-control invalid';
		document.getElementById('birthdateMessage').innerHTML =
		"You must be 13 years or older to sign up!";
		return false;
	} else {
		form['birthdate'].className = 'form-control';
		document.getElementById('birthdateMessage').innerHTML = "";
		return true;
	}
}

function validateZip(zip, form) {
	var zipRegExp = new RegExp('^\\d{5}$');
	if (zipRegExp.test(zip)) {
		form['zip'].className = 'form-control';
		return true;
	} else {
		form['zip'].className = 'form-control invalid';
		return false;
	}
}

document.addEventListener('DOMContentLoaded', Function);
